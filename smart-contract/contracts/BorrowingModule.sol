// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "./interfaces/ILendingPool.sol";

contract BorrowingModule {
    ILendingPool public lendingPool;
    IERC20 public veltToken;
    IERC20 public usdtToken;

    uint256 public constant MAX_BORROW_LIMIT = 75; //75% Loan-to-Value (LTV) ratio

    mapping(address => uint256) public borrowedAmount;

    event Borrow(address indexed user, uint256 amount, uint256 timestamp);

    constructor(address _lendingPool, address _veltToken, address _usdtToken) {
        lendingPool = ILendingPool(_lendingPool);
        veltToken = IERC20(_veltToken);
        usdtToken = IERC20(_usdtToken);
    }

    function borrow(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");

        uint256 veltBalance = veltToken.balanceOf(msg.sender);
        require(veltBalance > 0, "No VELT collateral");

        // Allow borrowing up to 75% of VELT balance as USDT
        uint256 maxBorrowable = (veltBalance * MAX_BORROW_LIMIT) / 100;

        require(
            _amount + borrowedAmount[msg.sender] <= maxBorrowable,
            "Exceeds max borrow limit"
        );

        // Update borrowed amount
        borrowedAmount[msg.sender] += _amount;

        // Transfer USDT from this contract to the user
        usdtToken.transfer(msg.sender, _amount);

        emit Borrow(msg.sender, _amount, block.timestamp);
    }

    /// @notice Allows the owner or users to deposit USDT into the contract
    function depositUSDT(uint256 amount) external {
        usdtToken.transferFrom(msg.sender, address(this), amount);
    }

    function repay(uint256 _amount) external {
        require(borrowedAmount[msg.sender] >= _amount, "Nothing to repay");

        usdtToken.transferFrom(msg.sender, address(this), _amount);
        borrowedAmount[msg.sender] -= _amount;
    }
}
