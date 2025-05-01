// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "./interfaces/ILendingPool.sol";
import {AggregatorV3Interface} from "./interfaces/AggregatorV3Interface.sol";

contract BorrowingModule {
    ILendingPool public lendingPool;
    IERC20 public veltToken;
    IERC20 public usdtToken;
    AggregatorV3Interface public priceFeed;

    uint256 public constant MAX_BORROW_LIMIT = 75; // 75% Loan-to-Value ratio
    uint256 public constant LIQUIDATION_THRESHOLD = 85; // 85% threshold for liquidation
    uint256 public constant INTEREST_RATE = 5; // 5% annual interest

    mapping(address => uint256) public borrowedAmount;
    mapping(address => uint256) public borrowTimestamp;

    event Borrow(address indexed user, uint256 amount, uint256 timestamp);
    event Repay(address indexed user, uint256 amount, uint256 timestamp);
    event Liquidate(address indexed user, uint256 collateralSeized);

    constructor(
        address _lendingPool,
        address _veltToken,
        address _usdtToken,
        address _priceFeed
    ) {
        lendingPool = ILendingPool(_lendingPool);
        veltToken = IERC20(_veltToken);
        usdtToken = IERC20(_usdtToken);
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function borrow(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");

        uint256 veltBalance = veltToken.balanceOf(msg.sender);
        require(veltBalance > 0, "No collateral");

        uint256 price = getMetisPrice();
        uint256 collateralValue = (veltBalance * price) / 1e8; // Adjust decimals
        uint256 maxBorrow = (collateralValue * MAX_BORROW_LIMIT) / 100;

        require(_amount <= maxBorrow, "Exceeds borrow limit");

        borrowedAmount[msg.sender] += _amount;
        borrowTimestamp[msg.sender] = block.timestamp;

        usdtToken.transfer(msg.sender, _amount);

        emit Borrow(msg.sender, _amount, block.timestamp);
    }

    function repay(uint256 _amount) external {
        require(borrowedAmount[msg.sender] > 0, "Nothing to repay");
        require(_amount > 0, "Invalid repay amount");

        uint256 interest = calculateInterest(msg.sender);
        uint256 totalOwed = borrowedAmount[msg.sender] + interest;

        require(_amount <= totalOwed, "Too much");

        usdtToken.transferFrom(msg.sender, address(this), _amount);
        borrowedAmount[msg.sender] = totalOwed - _amount;

        emit Repay(msg.sender, _amount, block.timestamp);
    }

    function liquidate(address user) external {
        require(borrowedAmount[user] > 0, "No debt");

        uint256 veltBalance = veltToken.balanceOf(user);
        uint256 price = getMetisPrice();
        uint256 collateralValue = (veltBalance * price) / 1e8;

        uint256 interest = calculateInterest(user);
        uint256 totalDebt = borrowedAmount[user] + interest;

        uint256 threshold = (collateralValue * LIQUIDATION_THRESHOLD) / 100;
        require(totalDebt > threshold, "Not eligible for liquidation");

        borrowedAmount[user] = 0;
        borrowTimestamp[user] = 0;

        // seize VELT tokens
        veltToken.transferFrom(user, address(this), veltBalance);

        emit Liquidate(user, veltBalance);
    }

    function depositUSDT(uint256 amount) external {
        usdtToken.transferFrom(msg.sender, address(this), amount);
    }

    function getMetisPrice() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }

    function calculateInterest(address user) public view returns (uint256) {
        uint256 principal = borrowedAmount[user];
        uint256 timeElapsed = block.timestamp - borrowTimestamp[user];
        uint256 interest = (principal * INTEREST_RATE * timeElapsed) /
            (365 days * 100);
        return interest;
    }
}
