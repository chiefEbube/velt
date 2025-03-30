// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IVelt} from "./interfaces/IVelt.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LendingPool is ReentrancyGuard {
    IVelt public veltToken;

    constructor(address _veltToken) {
        veltToken = IVelt(_veltToken);
    }

    struct DepositInfo {
        uint amount; // Amount of tokens deposited
        // uint unlockTime; // Time when the deposit can be withdrawn
    }

    mapping(address => DepositInfo) public userDeposits;

    event Deposit(address indexed user, uint amount, uint time);
    event Withdrawal(address indexed user, uint amount, uint time);

    function deposit(address _onBehalfOf) public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        userDeposits[_onBehalfOf].amount += msg.value;
        // userDeposits[_onBehalfOf].unlockTime = block.timestamp + 30 days; // ⏳ Reset unlock time per user

        // Mint VLT tokens equal to METIS deposited (1:1 ratio for now)
        veltToken.mint(_onBehalfOf, msg.value);

        emit Deposit(_onBehalfOf, msg.value, block.timestamp);
    }

    function withdraw(uint256 _amount) public nonReentrant {
        require(_amount > 0, "Withdraw amount must be greater than zero");
        require(
            userDeposits[msg.sender].amount >= _amount,
            "Insufficient balance"
        );

        // Burn VLT tokens before releasing METIS
        veltToken.burn(msg.sender, _amount);

        // Update user balance
        userDeposits[msg.sender].amount -= _amount;

        // Transfer METIS back to user
        payable(msg.sender).transfer(_amount);

        emit Withdrawal(msg.sender, _amount, block.timestamp);
    }
}
