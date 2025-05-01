// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "./interfaces/ILendingPool.sol";

contract BorrowingModule {
    ILendingPool public lendingPool;
    IERC20 public veltToken;
    IERC20 public usdtToken;

    uint256 public constant BASE_LTV = 75; // 75% LTV
    uint256 public constant LIQUIDATION_THRESHOLD = 85; // 85% usage triggers liquidation
    uint256 public constant INTEREST_RATE = 5; // 5% annual
    uint256 public constant SECONDS_IN_YEAR = 365 days;

    mapping(address => uint256) public borrowedAmount;
    mapping(address => uint256) public borrowTimestamps;

    event Borrow(address indexed user, uint256 amount);
    event Repay(address indexed user, uint256 amount, uint256 interest);
    event Liquidated(address indexed user, uint256 totalDebt);

    constructor(address _lendingPool, address _veltToken, address _usdtToken) {
        lendingPool = ILendingPool(_lendingPool);
        veltToken = IERC20(_veltToken);
        usdtToken = IERC20(_usdtToken);
    }

    function borrow(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        uint256 veltBalance = veltToken.balanceOf(msg.sender);
        require(veltBalance > 0, "No collateral");

        uint256 maxBorrow = (veltBalance * BASE_LTV) / 100;
        uint256 newTotalBorrowed = borrowedAmount[msg.sender] + _amount;
        require(newTotalBorrowed <= maxBorrow, "Exceeds LTV");

        borrowedAmount[msg.sender] = newTotalBorrowed;
        borrowTimestamps[msg.sender] = block.timestamp;

        usdtToken.transfer(msg.sender, _amount);
        emit Borrow(msg.sender, _amount);
    }

    /// @notice Allows the owner or users to deposit USDT into the contract
    function depositUSDT(uint256 amount) external {
        usdtToken.transferFrom(msg.sender, address(this), amount);
    }

    function repay(uint256 _amount) external {
        require(borrowedAmount[msg.sender] >= _amount, "Nothing to repay");

        uint256 interest = calculateInterest(msg.sender);
        uint256 totalOwed = _amount + interest;

        usdtToken.transferFrom(msg.sender, address(this), totalOwed);
        borrowedAmount[msg.sender] -= _amount;
        borrowTimestamps[msg.sender] = block.timestamp;

        emit Repay(msg.sender, _amount, interest);
    }

    function calculateInterest(address _user) public view returns (uint256) {
        uint256 principal = borrowedAmount[_user];
        uint256 timeElapsed = block.timestamp - borrowTimestamps[_user];
        return
            (principal * INTEREST_RATE * timeElapsed) / (100 * SECONDS_IN_YEAR);
    }

    function liquidate(address user) external {
        uint256 principal = borrowedAmount[user];
        require(principal > 0, "No debt");

        uint256 interest = calculateInterest(user);
        uint256 totalDebt = principal + interest;

        uint256 veltBalance = veltToken.balanceOf(user);
        uint256 maxAllowed = (veltBalance * LIQUIDATION_THRESHOLD) / 100;

        require(totalDebt > maxAllowed, "Health factor OK");

        // Burn/seize VELT from user
        veltToken.transferFrom(user, address(this), veltBalance);

        // Reset state
        borrowedAmount[user] = 0;
        borrowTimestamps[user] = 0;

        emit Liquidated(user, totalDebt);
    }
}
