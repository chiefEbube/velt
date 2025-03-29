// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LendingPool is Ownable {
    IVeltToken public veltToken;
    uint256 public exchangeRate = 100;

    mapping(address => uint256) public userDeposits;

    event Deposited(
        address indexed user,
        uint256 metisAmount,
        uint256 tokenAmount
    );
    event Withdrawn(address indexed user, uint256 metisAmount);

    constructor(address _veltToken) Ownable(msg.sender) {
        veltToken = IVeltToken(_veltToken);
    }

    function setExchangeRate(uint256 _rate) external onlyOwner {
        exchangeRate = _rate;
    }

    function deposit() public payable {
        require(msg.value > 0, "Must send METIS");

        uint256 mintAmount = msg.value * exchangeRate;
        userDeposits[msg.sender] += msg.value;

        veltToken.mint(msg.sender, mintAmount);

        emit Deposited(msg.sender, msg.value, mintAmount);
    }

    function withdraw(uint256 metisAmount) external {
        require(
            userDeposits[msg.sender] >= metisAmount,
            "Insufficient deposit"
        );

        uint256 veltToBurn = metisAmount * exchangeRate;
        userDeposits[msg.sender] -= metisAmount;

        veltToken.burn(msg.sender, veltToBurn);
        payable(msg.sender).transfer(metisAmount);

        emit Withdrawn(msg.sender, metisAmount);
    }

    receive() external payable {
        deposit();
    }
}

// Interface for the Platform Token contract (allows minting and burning)
interface IVeltToken is IERC20 {
    function mint(address to, uint256 amount) external;

    function burn(address from, uint256 amount) external;
}
