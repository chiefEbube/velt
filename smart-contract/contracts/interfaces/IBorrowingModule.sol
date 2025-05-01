// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IBorrowingModule {
    function borrow(uint256 _amount) external;

    function repay(uint256 _amount) external;

    function depositUSDT(uint256 amount) external;

    function liquidate(address user) external;

    function getMetisPrice() external view returns (uint256);

    function calculateInterest(address user) external view returns (uint256);
}
