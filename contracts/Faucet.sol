//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BlueToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Create Faucet contract for BlueToken - BTKn.
/// @author Team BlueToken (BTKn).
/// @notice all users can claim the token but with a waiting time to reload the faucet.
/// @dev This Faucet connects to a ERC20 contract (BlueToken - BTKn).

contract Faucet is Ownable {
    BlueToken private _token;
    mapping(address => uint256) private _claimers;
    uint128 private _transferAmount;
    uint48 private _delay;

    event Claimed(address indexed claimer, uint256 amount);

    constructor(
        address blueTokenAddress,
        uint128 transferAmount_,
        uint48 delayHour_
    ) {
        _token = BlueToken(blueTokenAddress);
        _transferAmount = transferAmount_;
        _delay = delayHour_ * 1 minutes;
    }

    /// @notice The claim function allows the user to retrieve their BKTn.
    /// @dev The claimToken function is public.
    /// The require is added to control the notion of time, the user can only claim once during a determined time.
    /// If everything is ok, the token transfer will be carried out correctly from the contract to the user.
    /// An event Claimed was added to retrieve the event on the front side.

    function claimToken() public {
        require(block.timestamp >= _claimers[msg.sender], "Faucet: you need to wait");
        _claimers[msg.sender] = block.timestamp + _delay;
        _token.transferFrom(owner(), msg.sender, _transferAmount);
        emit Claimed(msg.sender, _transferAmount);
    }
    
    /// @notice The SetDelay function allows you to define the duration of the claim expressed in hours.
    /// @dev The function is public and only owner of contract can modify this value.

    function setDelay(uint48 newDelay_) public onlyOwner {
        _delay = newDelay_ * 1 hours;
    }

    /// @notice This function allows to define the amount to claim BlueToken.
    /// @dev The function is public and only owner of contract can modify this value.

    function setTransferAmount(uint128 newAmount_) public onlyOwner {
        _transferAmount = newAmount_;
    }
    
    /// @notice The delayOf function allows you to see the delay of each address before the next claim.
    /// @dev This function is public view and return value (Uint256).
    /// @return Delay of claimers address.

    function delayOf(address claimer) public view returns (uint256) {
        return _claimers[claimer];
    }
    /// @notice The delay function allows to see the current value of the delay of the claim modified by the owner.
    /// @dev This function is public view and return value (Uint48).
    /// @return Delay of the claim.

    function delay() public view returns (uint48) {
        return _delay;
    }

    /// @notice The transferAmount function allows to see the current value of the amount that users can BlueToken claim.
    /// @dev This function is public view and return value (Uint128).
    /// @return Claim amount for the BlueToken.

    function transferAmount() public view returns (uint128) {
        return _transferAmount;
    }

    /// @notice The timeRest function allows you to see the remaining time before claiming the next token
    /// @dev This function is public view and return value (Uint256).
    /// @return Time for next BlueToken claim.

    function timeRest() public view returns (uint256) {
        return _claimers[msg.sender] > block.timestamp ? _claimers[msg.sender] - block.timestamp : 0;
    }
}
