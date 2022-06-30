import { ethers, run, network } from "hardhat"

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("deploying SimpleStorage")
  const simpleStorage = await simpleStorageFactory.deploy()
  simpleStorage.deployed()
  console.log("Deployed SimpleStorage address:", simpleStorage.address)

  if (network.config.chainId === 4 && process.env.ETHSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const curValue = await simpleStorage.retrieve()
  console.log("current Value is :", curValue)

  const transResponse = await simpleStorage.store(9)
  await transResponse.wait(1)
  const newValue = await simpleStorage.retrieve()
  console.log("new Value is :", newValue)
}

async function verify(contractAddress: string, args: any[]) {
  console.log("verifying the contract....")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.log(e.message)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
