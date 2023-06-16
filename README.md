# Title

Cryptite Token

# Description

This is a smart contract written in Solidity that implements a basic token called "Cryptite" (CPT). The contract includes functionalities for minting tokens, burning tokens, and transferring tokens between addresses. Additionally, it demonstrates the usage of require(), assert(), and revert() statements for handling various conditions and ensuring the integrity of the contract.

# Link

Github Link: https://github.com/Timilehin-bello/metacrafters-sol_frontend

# Author

Oluwatimilehin Bello
Github Link: https://github.com/Timilehin-bello

# How to Install and Run the Project

**Clone the repository**

```javascript
git clone https://github.com/Timilehin-bello/metacrafters-sol_frontend.git
```

**cd into the Client Folder**

```bash
cd metacrafters-sol_frontend
```

**Delete package-lock.json**

```bash
rm package-lock.json
```

**Install the dependencies**

```javascript
npm install
```

**Start Hardhat node**

```javascript
npx hardhat node
```

**Run the deploy Script**

```javascript
npx hardhat run  ./scripts/deploy.js
```

**Start the development server**

```javascript
npm run dev
```

**Port to Run the Website**

```
http://localhost:3000
```

### !!IMPORTANT

- Ensure you're connected to your localhost network provided by hardhat, the network setup is below

## Metamask Setup

### Localhost Network Setup

1. Open metamask and add network.
2. Network name `Localhost`
3. New RPC URL `http://127.0.0.1:8545`
4. Chain ID `31337`
5. Currency symbol `GO`

## Contract Variables

### `name`

- Type: `string`
- Description: Stores the name of the token.
- Example: `"Cryptite"`

### `symbol`

- Type: `string`
- Description: Stores the symbol of the token.
- Example: `"CPT"`

### `totalSupply`

- Type: `uint256`
- Description: Stores the total supply of tokens.
- Example: `100000`

### `balanceOf`

- Type: `mapping(address => uint256)`
- Description: Maps addresses to their corresponding token balances.
- Example: `balanceOf[0x123456789...] = 1000`

## Contract Functions

### `constructor()`

- Description: Initializes the contract by assigning the total supply of tokens to the contract owner's address.

### `mint(address _to, uint256 _value) public`

- Description: Creates new tokens and assigns them to the specified address.
- Parameters:
  - `_to`: The address to which the tokens will be assigned.
  - `_value`: The number of tokens to mint.

### `burn(address _to, uint256 _value) public`

- Description: Burns a specific amount of tokens from the specified address.
- Parameters:
  - `_to`: The address from which the tokens will be burned.
  - `_value`: The number of tokens to burn.

### `transfer(address _to, uint256 _value) public returns (bool success)`

- Description: Transfers tokens from the sender's address to the specified address.
- Parameters:
  - `_to`: The address to which the tokens will be transferred.
  - `_value`: The number of tokens to transfer.
- Returns: `true` if the transfer is successful, otherwise `false`.

### Event: `Transfer(address indexed _from, address indexed _to, uint256 _value)`

- Description: An event emitted when tokens are transferred between addresses.
- Parameters:
  - `_from`: The address from which the tokens are transferred.
  - `_to`: The address to which the tokens are transferred.
  - `_value`: The number of tokens transferred.

## Error Handling

The contract utilizes the following error handling mechanisms:

### `require()`

- Usage: `require(condition, errorMessage)`
- Description: Checks if a condition is true. If the condition evaluates to `false`, it reverts the transaction and throws an error message.

### `revert()`

- Usage: `revert(errorMessage)`
- Description: Reverts the transaction and throws an error message. This is used to explicitly indicate an error condition and revert the state changes.

### `assert()`

- Usage: `assert(condition)`
- Description: Checks if a condition is true. If the condition evaluates to `false`, it indicates an unexpected state and triggers a revert. It is used to ensure that internal invariant checks are satisfied.

## Dependencies

- `ethers`: A compact JavaScript library with full functionality for interacting with the Ethereum blockchain.

- `next`: it's a flexible React framework that gives you building blocks to create fast web applications.

- `react`: it implement a render() method that takes input data and returns what to display

- `react-dom`: it provides DOM specific methods that can be used at the top level of a web app to enable an efficient way of managing DOM elements of the web page

- `web3modal`: It's an easy-to-use library to help developers add support for multiple providers in their apps with a simple customizable configuration.

## Dev Dependencies

- `@nomicfoundation/hardhat-toolbox`: It bundles all the commonly used packages and Hardhat plugins for development in Hardhat.
- `hardhat`: A development environment that helps in testing, compiling, deploying, and debugging dApps on the Ethereum blockchain.

## Assessment Submission to MetaCrafters

This smart contract serves as my submission for the assessment to MetaCrafters. I have implemented the required functionalities and included explanations for each variable and function in this README. If you have any questions or need further clarification, please let me know.

## License

This Cryptite Token is licensed under the MIT License, allowing anyone to use, modify, and distribute the code. You can find the license text at the beginning of the contract file.
