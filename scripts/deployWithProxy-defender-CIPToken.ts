import { ethers, defender } from "hardhat"

async function main() {
  const cipToken = await ethers.getContractFactory("CIPToken")

  const upgradeApprovalProcess = await defender.getUpgradeApprovalProcess()

  if (upgradeApprovalProcess.address === undefined) {
    throw new Error(
      `Upgrade approval process with id ${upgradeApprovalProcess.approvalProcessId} has no assigned address`
    )
  }

  const deployment = await defender.deployProxy(
    cipToken,
    ["0xdD8ae8624275D68e25869457037277DCd4E0082c"], //Init mint recipient
    { initializer: "initialize" }
  )

  await deployment.waitForDeployment()

  console.log("Proxy deployed to:", await deployment.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
