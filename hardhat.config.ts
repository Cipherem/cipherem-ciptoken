import * as dotenv from "dotenv"
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-contract-sizer"
import "@openzeppelin/hardhat-upgrades"

dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  gasReporter: {
    currency: "USD",
    //gasPrice: 17,
    enabled: true,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
  },
  networks: {
    mainnet: {
      url: String(process.env.MAINNET_RPCURL),
      accounts:
        process.env.MAINNET_PRIVATE_KEY != undefined
          ? [process.env.MAINNET_PRIVATE_KEY]
          : [],
      gasPrice: Number(process.env.MAINNET_GASPRICE),
    },
    sepolia: {
      url: String(process.env.SEPOLIA_RPCURL),
      accounts:
        process.env.SEPOLIA_PRIVATE_KEY != undefined
          ? [process.env.SEPOLIA_PRIVATE_KEY]
          : [],
      gasPrice: Number(process.env.SEPOLIA_GASPRICE),
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_MAINNET_APIKEY!,
      sepolia: process.env.ETHERSCAN_SEPOLIA_APIKEY!,
    },
  },
}

export default config
