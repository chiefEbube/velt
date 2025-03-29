// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface ILendingPool {
    function deposit(address asset, uint256 amount) external;

    function withdraw(address asset, uint256 amount) external;

    function borrow(address asset, uint256 amount) external;

    function repay(address asset, uint256 amount) external;
}
