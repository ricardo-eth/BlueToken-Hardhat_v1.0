//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BlueToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {
    BlueToken private _token;
    uint256 private _transferAmount;
    uint256 private _delay;
    mapping(address => uint256) private _claimers;

    // TODO event

    constructor(
        address blueTokenAddress,
        uint256 transferAmount_,
        uint256 delayHour_
    ) {
        _token = BlueToken(blueTokenAddress);
        _transferAmount = transferAmount_;
        _delay = delayHour_ * 1 hours;
    }

    function claimToken() public {
        require(block.timestamp >= _claimers[msg.sender], "Faucet: you need to wait");
        _claimers[msg.sender] = block.timestamp + _delay;
        _token.transferFrom(owner(), msg.sender, _transferAmount);
        // event
    }

    function setDelay(uint256 newDelay_) public onlyOwner {
        _delay = newDelay_;
    }

    function setTransfertAmount(uint256 newAmount_) public onlyOwner {
        _transferAmount = newAmount_;
    }

    function delayOf(address claimer) public view returns (uint256) {
        return _claimers[claimer];
    }

    function delay() public view returns (uint256) {
        return _delay;
    }

    function transfertAmount() public view returns (uint256) {
        return _transferAmount;
    }
}
