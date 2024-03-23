import { ethers, upgrades } from "hardhat"

async function main() {
  const proxyAddress = "" //Deployed proxy address to upgrade

  const cipToken = await ethers.getContractFactory("CIPToken")

  await upgrades.upgradeProxy(proxyAddress, cipToken)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
