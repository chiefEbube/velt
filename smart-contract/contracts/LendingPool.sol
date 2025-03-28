// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {VeltToken} from "./tokens/VeltToken.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LendingPool is Ownable, ReentrancyGuard {
    VeltToken public vltToken;
    mapping(address => uint256) public deposits;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _vltToken) Ownable(msg.sender) {
        vltToken = VeltToken(_vltToken);
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit must be greater than zero");

        deposits[msg.sender] += msg.value;
        vltToken.mint(msg.sender, msg.value);

        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(deposits[msg.sender] >= amount, "Insufficient balance");

        deposits[msg.sender] -= amount;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH Transfer failed");

        vltToken.burn(msg.sender, amount);

        emit Withdrawn(msg.sender, amount);
    }

    receive() external payable {}
}
