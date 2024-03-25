# Cipherem CIP Token

The token is made of one upgradable smart contract called `CIPToken`, that implements OpenZeppelin V5 audited smart contracts:

<https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.2/audits/README.md>

## Token information

Name: `CIPHEREM`
Symbol: `CIP`
Decimals: `18`

## CIPToken.sol

Upgradable smart contract that implements: `ERC20Upgradeable`, `ERC20BurnableUpgradeable` and `ERC20PermitUpgradeable`.

The smart contract is optimized with 999999 runs, to reduce gas fees with high transaction volume.

Implements Permit EIP712 signatures, in order to gas-less approve tokens for transfer, reducing calls needed to swap.

Implementation initialized in the constructor during deployment without leaving it uninitialized, increasing safety.

Passed all unit tests regarding implemented functions:
- Deployment
- Transfer
- Transfer from
- Burn
- Burn from
- Permit with signature

## Environment variables
```
MAINNET_RPCURL=
MAINNET_PRIVATE_KEY=
MAINNET_GASPRICE=
SEPOLIA_RPCURL=
SEPOLIA_PRIVATE_KEY=
SEPOLIA_GASPRICE=
ETHERSCAN_MAINNET_APIKEY=
ETHERSCAN_SEPOLIA_APIKEY=
```

## Compilation, testing and deployment

Contracts compilation with the following command:
```
npx hardhat compile
```

Unit tests with the following command:
```
npx hardhat test
```

Production deployment with the following command (before running, check script parameters):
```
npx hardhat run --network mainnet scripts/deployWithProxy-CIPToken.ts
```

Testnet deployment with the following command (before running, check script parameters):
```
npx hardhat run --network sepolia scripts/deployWithProxy-CIPToken.ts
```

Production upgrade with the following command (before running, check script parameters):
```
npx hardhat run --network mainnet scripts/upgrade-CIPToken.ts
```

Testnet upgrade with the following command (before running, check script parameters):
```
npx hardhat run --network sepolia scripts/upgrade-CIPToken.ts
```

Production verify with the following command (before running, check script parameters):
```
npx hardhat verify --network mainnet DEPLOYED_PROXY_ADDRESS
```

Testnet verify with the following command (before running, check script parameters):
```
npx hardhat verify --network sepolia DEPLOYED_PROXY_ADDRESS
```