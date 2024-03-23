import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"
import { CIPToken } from "../typechain-types"

describe("CIPToken", function () {
  let mainSigner: HardhatEthersSigner

  let userSigner: HardhatEthersSigner

  let spenderSigner: HardhatEthersSigner

  let deployedCIPToken: CIPToken

  beforeEach(async function () {
    const [signer1, signer2, signer3] = await ethers.getSigners()

    mainSigner = signer1

    userSigner = signer2

    spenderSigner = signer3

    const cipToken = await ethers.getContractFactory("CIPToken")

    deployedCIPToken = (await upgrades.deployProxy(cipToken, [
      mainSigner.address,
    ])) as any as CIPToken
  })

  it("Deployment", async function () {
    expect(await deployedCIPToken.name()).to.equal("CIPHEREM")
    expect(await deployedCIPToken.symbol()).to.equal("CIP")
    expect(await deployedCIPToken.totalSupply()).to.equal(
      ethers.parseUnits("300000000", 18)
    )
  })

  it("Transfer", async function () {
    await deployedCIPToken
      .connect(mainSigner)
      .transfer(userSigner.address, ethers.parseUnits("50000000", 18))

    expect(await deployedCIPToken.balanceOf(userSigner.address)).to.equal(
      ethers.parseUnits("50000000", 18)
    )
  })

  it("Transfer from", async function () {
    await deployedCIPToken
      .connect(mainSigner)
      .approve(spenderSigner.address, ethers.parseUnits("30000000", 18))

    await deployedCIPToken
      .connect(spenderSigner)
      .transferFrom(
        mainSigner.address,
        userSigner.address,
        ethers.parseUnits("30000000", 18)
      )

    expect(await deployedCIPToken.balanceOf(userSigner.address)).to.equal(
      ethers.parseUnits("30000000", 18)
    )
  })

  it("Burn", async function () {
    await deployedCIPToken
      .connect(mainSigner)
      .burn(ethers.parseUnits("50000000", 18))

    expect(await deployedCIPToken.totalSupply()).to.equal(
      ethers.parseUnits("250000000", 18)
    )

    expect(await deployedCIPToken.balanceOf(mainSigner.address)).to.equal(
      ethers.parseUnits("250000000", 18)
    )
  })

  it("Burn from", async function () {
    await deployedCIPToken
      .connect(mainSigner)
      .approve(spenderSigner.address, ethers.parseUnits("40000000", 18))

    await deployedCIPToken
      .connect(spenderSigner)
      .burnFrom(mainSigner.address, ethers.parseUnits("40000000", 18))

    expect(await deployedCIPToken.totalSupply()).to.equal(
      ethers.parseUnits("260000000", 18)
    )

    expect(await deployedCIPToken.balanceOf(mainSigner.address)).to.equal(
      ethers.parseUnits("260000000", 18)
    )
  })

  it("Permit with signature", async function () {
    const txDomain = {
      name: "CIPHEREM",
      version: "1",
      chainId: 31337,
      verifyingContract: await deployedCIPToken.getAddress(),
    }

    const txTypes = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    }

    const txValue = {
      owner: mainSigner.address,
      spender: spenderSigner.address,
      value: ethers.parseUnits("60000000", 18),
      nonce: 0,
      deadline: 1737140702,
    }

    let signedTx = await mainSigner.signTypedData(txDomain, txTypes, txValue)

    let signature = ethers.Signature.from(signedTx)

    await deployedCIPToken
      .connect(userSigner)
      .permit(
        mainSigner.address,
        spenderSigner.address,
        ethers.parseUnits("60000000", 18),
        1737140702,
        signature.v,
        signature.r,
        signature.s
      )

    await deployedCIPToken
      .connect(spenderSigner)
      .transferFrom(
        mainSigner.address,
        userSigner.address,
        ethers.parseUnits("60000000", 18)
      )
  })
})
