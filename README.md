# ERC20-Faucet BlueToken (BTKn)

## About
**NOTES**:
 - The following specifications use syntax from Solidity `0.8.0` (or above)
 - An ERC20 Token Faucet on the Rinkeby, Ropsten, Kovan and Görli testnets.

<br />

## How to Add Your Custom BlueToken (BTKn) to MetaMask

1. Open MetaMask and click on the "burger" menu icon:
2. Click on the "ADD TOKEN" button:
3. Select "Custom Token" tab:
4. Paste the copied contract address from the first step to the "Token Address" (Verification : Address, Token Symbol and Decimal)
5. Click the "NEXT" button:
6. Click the "ADD TOKENS" button:
7. You are done.

## Deployed Faucet Token
- ### Address Contract : 
* Address : See below table
* Token : BKTn
* Decimal : 18

| Network  | Address |
| ------------- | ------------- |
| Rinkeby  | [0xA6dB68cfE4C4735d1a2158Bc4e2D6C663e038cD7](https://rinkeby.etherscan.io/token/0xA6dB68cfE4C4735d1a2158Bc4e2D6C663e038cD7)  |
| Ropsten  | [xxx](https://ropsten.etherscan.io/token/xxx)  |
| Kovan  | [xxx](https://kovan.etherscan.io/token/xxx)  |
| Görli  | [xxx](https://goerli.etherscan.io/address/xxx)  |
<br />

## Testnet Ether Faucets

Testnet   | Explorers                     | Testnet ETH Faucets
:-------- |:----------------------------- |:-------------------------
Rinkeby   | https://rinkeby.etherscan.io/ | xxx |
Ropsten   | https://ropsten.etherscan.io/ | xxx |
Kovan     | https://kovan.etherscan.io/   | xxx |
Görli     | https://goerli.etherscan.io/  | xxx |

<br />

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

**NOTE:** 
xxxx
### Faucet - Function
#### Claim


``` js
xxx
```

