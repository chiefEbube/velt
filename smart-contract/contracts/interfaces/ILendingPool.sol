// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface ILendingPool {
    function userDeposits(address user) external view returns (uint256);

    function deposit(address _onBehalfOf) external payable;

    function withdraw(uint256 _amount) external;
}
