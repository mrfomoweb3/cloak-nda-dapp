import { expect } from "chai"
import { ethers } from "hardhat"
import type { NDAManager } from "../typechain-types"

describe("NDAManager", () => {
  let ndaManager: NDAManager
  let creator: any
  let counterparty: any
  let auditor: any

  beforeEach(async () => {
    // Get signers
    ;[creator, counterparty, auditor] = await ethers.getSigners()

    // Deploy contract
    const NDAManager = await ethers.getContractFactory("NDAManager")
    ndaManager = await NDAManager.deploy()
    await ndaManager.waitForDeployment()
  })

  describe("NDA Creation", () => {
    it("Should create a new NDA", async () => {
      const title = "Test NDA"
      const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("terms").toString("hex"))
      const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
      const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

      const tx = await ndaManager
        .connect(creator)
        .createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate)

      await expect(tx).to.emit(ndaManager, "NDACreated")

      const ndaCount = await ndaManager.getNDACount()
      expect(ndaCount).to.equal(1)
    })

    it("Should reject NDA with invalid expiration date", async () => {
      const title = "Test NDA"
      const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("terms").toString("hex"))
      const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
      const expirationDate = Math.floor(Date.now() / 1000) - 1000 // Past date

      await expect(
        ndaManager.connect(creator).createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate),
      ).to.be.revertedWith("Invalid expiration date")
    })

    it("Should reject NDA with empty title", async () => {
      const title = ""
      const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("terms").toString("hex"))
      const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
      const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

      await expect(
        ndaManager.connect(creator).createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate),
      ).to.be.revertedWith("Title cannot be empty")
    })
  })

  describe("NDA Signature", () => {
    let ndaId: any

    beforeEach(async () => {
      const title = "Test NDA"
      const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("terms").toString("hex"))
      const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
      const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

      const tx = await ndaManager
        .connect(creator)
        .createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate)
      await tx.wait()

      const events = await ndaManager.queryFilter("NDACreated")
      ndaId = events[events.length - 1].args?.[0]
    })

    it("Should request signature from counterparty", async () => {
      const tx = await ndaManager.connect(creator).requestSignature(ndaId, counterparty.address)

      await expect(tx).to.emit(ndaManager, "NDASignatureRequested")

      const nda = await ndaManager.getNDA(ndaId)
      expect(nda.status).to.equal(1) // PENDING_SIGNATURE
    })

    it("Should allow counterparty to sign NDA", async () => {
      await ndaManager.connect(creator).requestSignature(ndaId, counterparty.address)

      const tx = await ndaManager.connect(counterparty).signNDA(ndaId)

      await expect(tx).to.emit(ndaManager, "NDASigned")

      const nda = await ndaManager.getNDA(ndaId)
      expect(nda.status).to.equal(2) // SIGNED
    })

    it("Should reject signature if not pending", async () => {
      await expect(ndaManager.connect(counterparty).signNDA(ndaId)).to.be.revertedWith("NDA not pending signature")
    })
  })

  describe("Access Control", () => {
    let ndaId: any

    beforeEach(async () => {
      const title = "Test NDA"
      const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("terms").toString("hex"))
      const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
      const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

      const tx = await ndaManager
        .connect(creator)
        .createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate)
      await tx.wait()

      const events = await ndaManager.queryFilter("NDACreated")
      ndaId = events[events.length - 1].args?.[0]
    })

    it("Should grant auditor access", async () => {
      const tx = await ndaManager.connect(creator).grantAuditorAccess(ndaId, auditor.address)

      await expect(tx).to.emit(ndaManager, "AccessGranted")

      const hasPermission = await ndaManager.hasPermission(ndaId, auditor.address)
      expect(hasPermission).to.be.true
    })

    it("Should only allow creator to grant access", async () => {
      await expect(ndaManager.connect(counterparty).grantAuditorAccess(ndaId, auditor.address)).to.be.revertedWith(
        "Only creator can grant access",
      )
    })
  })

  describe("NDA Termination", () => {
    let ndaId: any

    beforeEach(async () => {
      const title = "Test NDA"
      const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("terms").toString("hex"))
      const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
      const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

      const tx = await ndaManager
        .connect(creator)
        .createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate)
      await tx.wait()

      const events = await ndaManager.queryFilter("NDACreated")
      ndaId = events[events.length - 1].args?.[0]
    })

    it("Should terminate NDA", async () => {
      const tx = await ndaManager.connect(creator).terminateNDA(ndaId)

      await expect(tx).to.emit(ndaManager, "NDATerminated")

      const nda = await ndaManager.getNDA(ndaId)
      expect(nda.status).to.equal(4) // TERMINATED
    })

    it("Should mark NDA as inactive after termination", async () => {
      await ndaManager.connect(creator).terminateNDA(ndaId)

      const isActive = await ndaManager.isNDAActive(ndaId)
      expect(isActive).to.be.false
    })
  })

  describe("User NDAs Query", () => {
    it("Should return user's NDAs", async () => {
      const title = "Test NDA"
      const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("terms").toString("hex"))
      const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
      const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60

      await ndaManager.connect(creator).createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate)

      const userNDAs = await ndaManager.getUserNDAs(creator.address)
      expect(userNDAs.length).to.equal(1)
    })
  })
})
