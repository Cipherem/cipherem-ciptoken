import { ethers, defender } from "hardhat"

async function main() {
  const cipToken = await ethers.getContractFactory("CIPToken")

  const proposal = await defender.proposeUpgradeWithApproval(
    "PROXY ADDRESS",
    cipToken
  )

  console.log(`Upgrade proposed with URL: ${proposal.url}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
