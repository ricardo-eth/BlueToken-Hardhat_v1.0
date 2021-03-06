# BlueToken-Hardhat_v1.0 (BTKn)

## About

 - The following specifications use syntax from Solidity `0.8.0` (or above)
 - An ERC20 Token Faucet on the Rinkeby testnet.
 - Adresse ERC20 - BlueToken : 0x85211679fDF491E18676B623db07cABCaF815316
 - Adresse Faucet - BlueToken : 0xAD15db57F7342FD4CF80719013dBa63B378b4066
 - Dapp GitHub address : https://github.com/ricardo-eth/BlueToken-Dapp_v1.0/tree/main
 - The BlueToken Faucet has been deployed on Netlify : https://bluetoken-faucet.netlify.app


## Features :

- Project set up using :

```js
  "devDependencies": {
    "@nomiclabs/hardhat-ethers": "^2.0.2",
    "@nomiclabs/hardhat-solhint": "^2.0.0",
    "@nomiclabs/hardhat-waffle": "^2.0.1",
    "chai": "^4.3.4",
    "chalk": "^4.1.1",
    "dotenv": "^10.0.0",
    "eslint": "^7.28.0",
    "eslint-config-standard": "^16.0.3",
    "eslint-plugin-import": "^2.23.4",
    "eslint-plugin-mocha-no-only": "^1.1.1",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^5.1.0",
    "eslint-plugin-standard": "^5.0.0",
    "ethereum-waffle": "^3.3.0",
    "ethers": "^5.3.1",
    "hardhat": "^2.3.3",
    "hardhat-docgen": "^1.1.1",
    "prettier": "^2.3.1",
    "prettier-plugin-solidity": "^1.0.0-beta.13",
    "solhint": "^3.3.6"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^4.1.0"
  }
```
### Install :

Clone Repo Git : https://github.com/ricardo-eth/BlueToken-Hardhat_v1.0/tree/main

```zsh
% git clone git@github.com:ricardo-eth/BlueToken-Hardhat_v1.0.git
% cd BlueToken-Hardhat_v1.0
```
### Install dependencies :

```zsh
% yarn install
```
### Test Smart contract :

```zsh
% npx hardhat compile
% npx hardhat test
```
## Contract ERC20 - BlueToken - BKTn

**NOTE:** 
Import ERC20 contract by OpenZeppelin : 
https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol

### ERC20 - Function

#### ***Transfer :***

Transfers value amount of tokens to `address`.</br>

Requirements:
  - `recipient` cannot be the zero address.
  - the caller must have a balance of at least `amount`.

``` js
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

#### ***TransferFrom :***

Transfers value amount of tokens from address `_from` to address `_to`.</br>

Requirements:
  - `sender` and `recipient` cannot be the zero address.
  - `sender` must have a balance of at least `amount`.
  - the caller must have allowance for ``sender``'s tokens of at least `amount`.

``` js
  function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][_msgSender()];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(sender, _msgSender(), currentAllowance - amount);
        }

        return true;
      }
```

#### ***Approve :***

Allows `spender` to withdraw from your account multiple times, up to the value amount.</br>

Requirements:
- `spender` cannot be the zero address.

``` js
   function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }
```
#### ***IncreaseAllowance :***

Atomically increases the allowance granted to `spender` by the caller</br>

Requirements:
- `spender` cannot be the zero address.

``` js
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);
        return true;
    }
```

#### ***DecreaseAllowance :***

Atomically Decreases the allowance granted to `spender` by the caller</br>

Requirements:
- `spender` cannot be the zero address.
- `spender` must have allowance for the caller of at least `subtractedValue`.

``` js
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);
        return true;
    }
```
### ERC20 - Guetter
#### ***Name :***

Returns the name of the token. `"BlueToken"`.

``` js
    function name() public view virtual override returns (string memory) {
        return _name;
    }
```

#### ***Symbol :***

Returns the symbol of the token. `"BTKn"`.

``` js
  function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }
```

#### ***Decimals :***

Returns the number of decimals the token uses. `18`, means to divide the token amount by `1000000000` to get its user representation.

``` js
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
```

#### ***TotalSupply :***

Returns the total token supply.

``` js
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }
```

#### ***BalanceOf :***

Returns the account balance of another account.

``` js
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }
```

#### ***Allowance :***

Returns the amount which `_spender` is still allowed to withdraw from `_owner`.

``` js
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```
## Contract Faucet - BlueToken - BKTn

This contract has been deployed by the ERC20 BlueToken contract address
### Faucet - Function
#### ***ClaimToken :***

The claim function allows the user to retrieve their BKTn.

Requirements:
  - `_claimers` must not have a cooldown.

```js
    function claimToken() public {
        require(block.timestamp >= _claimers[msg.sender], "Faucet: you need to wait");
        _claimers[msg.sender] = block.timestamp + _delay;
        _token.transferFrom(owner(), msg.sender, _transferAmount);
        emit Claimed(msg.sender, _transferAmount);
    }
```
#### ***SetDelay :***

The SetDelay function allows you to define the duration of the claim expressed in hours.

Requirements:
  - `onlyOwner` The owner is the only one able to perform this function.

```js
    function setDelay(uint48 newDelay_) public onlyOwner {
        _delay = newDelay_ * 1 hours;
    }
```
#### ***SetTransferAmount :***

This function allows to define the amount to claim BlueToken.

Requirements:
  - `onlyOwner` The owner is the only one able to perform this function.

```js
    function setTransferAmount(uint128 newAmount_) public onlyOwner {
        _transferAmount = newAmount_;
    }
```
### Faucet - Guetter
#### ***DelayOf :***

Return Delay of `_claimers` address

``` js
    function delayOf(address claimer) public view returns (uint256) {
        return _claimers[claimer];
    }
```
#### ***Delay :***

Return `_delay` of the claim.

``` js
  function delay() public view returns (uint48) {
        return _delay;
    }
```
#### ***TransferAmount :***

Return the current value of the amount that users can BlueToken claim.

``` js
    function transferAmount() public view returns (uint128) {
        return _transferAmount;
    }
```
#### ***TimeRest :***

Return Time for next BlueToken claim.

``` js
    function timeRest() public view returns (uint256) {
        return _claimers[msg.sender] > block.timestamp ? _claimers[msg.sender] - block.timestamp : 0;
    }
```