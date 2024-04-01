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
    [
      "0xCf56D2a736940363167Dbf48925E3Db94d9A4cB9", //Init owner
      [
        //Init recipients
        [
          "0xCf56D2a736940363167Dbf48925E3Db94d9A4cB9",
          ethers.parseUnits("300000000", 18),
        ]
      ],
    ],
    { initializer: "initialize" }
  )

  await deployment.waitForDeployment()

  console.log("Proxy deployed to:", await deployment.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
