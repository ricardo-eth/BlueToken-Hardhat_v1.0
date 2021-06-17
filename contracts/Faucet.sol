//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BlueToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {
    BlueToken private _token;
    mapping(address => uint256) private _claimers;
    uint128 private _transferAmount;
    uint48 private _delay;

    event Claimed(address claimer, uint256 amount);

    constructor(
        address blueTokenAddress,
        uint128 transferAmount_,
        uint48 delayHour_
    ) {
        _token = BlueToken(blueTokenAddress);
        _transferAmount = transferAmount_;
        _delay = delayHour_ * 1 minutes;
    }

    function claimToken() public {
        require(block.timestamp >= _claimers[msg.sender], "Faucet: you need to wait");
        _claimers[msg.sender] = block.timestamp + _delay;
        _token.transferFrom(owner(), msg.sender, _transferAmount);
        emit Claimed(msg.sender, _transferAmount);
    }

    function setDelay(uint48 newDelay_) public onlyOwner {
        _delay = newDelay_ * 1 hours;
    }

    function setTransferAmount(uint128 newAmount_) public onlyOwner {
        _transferAmount = newAmount_;
    }

    function delayOf(address claimer) public view returns (uint256) {
        return _claimers[claimer];
    }

    function delay() public view returns (uint48) {
        return _delay;
    }

    function transferAmount() public view returns (uint128) {
        return _transferAmount;
    }

    function timeRest() public view returns (uint256) {
        return _claimers[msg.sender] > block.timestamp ? _claimers[msg.sender] - block.timestamp : 0;
    }
}
