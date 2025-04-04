// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendingPool} from "./interfaces/ILendingPool.sol";

contract BorrowingModule {
    ILendingPool public lendingPool;
    IERC20 public veltToken;
    IERC20 public usdtToken;

    mapping(address => uint256) public borrowedAmount;

    event Borrow(address indexed user, uint256 amount, uint256 timestamp);

    constructor(address _lendingPool, address _veltToken, address _usdtToken) {
        lendingPool = ILendingPool(_lendingPool);
        veltToken = IERC20(_veltToken);
        usdtToken = IERC20(_usdtToken);
    }

    function borrow(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            veltToken.balanceOf(msg.sender) >= _amount,
            "Not enough VELT collateral"
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
}
