//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Create BlueToken (BTKn).
/// @author Team BlueToken (BTKn).
/// @notice Token is a basic ERC20

contract BlueToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("BlueToken", "BTKn") {
        _mint(msg.sender, initialSupply * 10**decimals());
    }
}
