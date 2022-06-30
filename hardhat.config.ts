import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "solidity-coverage"
import "hardhat-gas-reporter"
import "./tasks/block-number.js"
import "dotenv/config"
import "@typechain/hardhat"
import { task } from "hardhat/config"

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PRIVATE_KEY = process.env.PRIVATE_KEY || "privatekey"
const ETHSCAN_API_KEY = process.env.ETHSCAN_API_KEY || "ethscanapikey"
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "rinkebyrpcurl"
const LOCAL_RPC_URL = process.env.LOCAL_RPC_URL || "localrpcurl"
const COINMARKETCAP_API_KEY =
  process.env.COINMARKETCAP_API_KEY || "coinmarketcapapikey"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost: {
      url: LOCAL_RPC_URL,
      chainId: 31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.json",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}
