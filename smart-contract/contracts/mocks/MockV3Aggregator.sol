// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract MockV3Aggregator {
    int256 public answer;
    uint8 public decimals;

    constructor(uint8 _decimals, int256 _initialAnswer) {
        decimals = _decimals;
        answer = _initialAnswer;
    }

    function latestRoundData()
        external
        view
        returns (uint80, int256, uint256, uint256, uint80)
    {
        return (0, answer, 0, 0, 0);
    }

    function updateAnswer(int256 _newAnswer) external {
        answer = _newAnswer;
    }
}
