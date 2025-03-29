// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact en4abraham@gmail.com

contract VeltToken is ERC20, Ownable, ERC20Burnable, ERC20Permit {
    address public lendingPool;

    constructor(
        address recipient,
        address initialOwner
    )
        ERC20("Velt Token", "VELT")
        Ownable(initialOwner)
        ERC20Permit("VeltToken")
    {
        _mint(recipient, 1000000000000 * 10 ** decimals());
    }

    modifier onlyLendingPool() {
        require(msg.sender == lendingPool, "Not authorized");
        _;
    }

    function setLendingPool(address _lendingPool) external onlyOwner {
        lendingPool = _lendingPool;
    }

    function mint(address to, uint256 amount) public onlyLendingPool {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyLendingPool {
        _burn(from, amount);
    }
}
