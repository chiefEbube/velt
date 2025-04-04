// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact en4abraham@gmail.com
contract USDT is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor(
        address recipient,
        address initialOwner
    ) ERC20("USDT", "USDT") Ownable(initialOwner) ERC20Permit("USDT") {
        _mint(recipient, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
