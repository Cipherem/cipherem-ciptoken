import { ethers, upgrades } from "hardhat"

async function main() {
  const cipToken = await ethers.getContractFactory("CIPToken")

  const deployedCIPToken = await upgrades.deployProxy(cipToken, [
    "0xdD8ae8624275D68e25869457037277DCd4E0082c", //Init mint recipient
  ])

  console.log("Proxy deployed to:", await deployedCIPToken.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
