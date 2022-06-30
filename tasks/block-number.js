const { task } = require("hardhat/config")

task("block-number", "Prints the block number", async (taskArgs, hre) => {
  const blockNum = await hre.ethers.provider.getBlockNumber()
  console.log(`current block number is ${blockNum}`)
})
