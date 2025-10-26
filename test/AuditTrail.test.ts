import { expect } from "chai"
import { ethers } from "hardhat"
import type { AuditTrail } from "../typechain-types"

describe("AuditTrail", () => {
  let auditTrail: AuditTrail
  let user: any

  beforeEach(async () => {
    ;[user] = await ethers.getSigners()

    const AuditTrail = await ethers.getContractFactory("AuditTrail")
    auditTrail = await AuditTrail.deploy()
    await auditTrail.waitForDeployment()
  })

  describe("Audit Logging", () => {
    it("Should log audit entry", async () => {
      const ndaId = 1
      const action = "NDA_CREATED"
      const data = ethers.toBeHex("0x")

      const tx = await auditTrail.logAudit(ndaId, user.address, action, data)

      await expect(tx).to.emit(auditTrail, "AuditLogged")

      const length = await auditTrail.getAuditLogLength()
      expect(length).to.equal(1)
    })

    it("Should retrieve audit entry", async () => {
      const ndaId = 1
      const action = "NDA_CREATED"
      const data = ethers.toBeHex("0x")

      await auditTrail.logAudit(ndaId, user.address, action, data)

      const entry = await auditTrail.getAuditEntry(0)
      expect(entry.ndaId).to.equal(ndaId)
      expect(entry.actor).to.equal(user.address)
      expect(entry.action).to.equal(action)
    })

    it("Should get NDA audit log", async () => {
      const ndaId = 1
      const action1 = "NDA_CREATED"
      const action2 = "NDA_SIGNED"
      const data = ethers.toBeHex("0x")

      await auditTrail.logAudit(ndaId, user.address, action1, data)
      await auditTrail.logAudit(ndaId, user.address, action2, data)
      await auditTrail.logAudit(2, user.address, "OTHER_ACTION", data)

      const ndaLog = await auditTrail.getNDAAuditLog(ndaId)
      expect(ndaLog.length).to.equal(2)
      expect(ndaLog[0].action).to.equal(action1)
      expect(ndaLog[1].action).to.equal(action2)
    })
  })
})
