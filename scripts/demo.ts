import { ethers } from "hardhat"
import * as fs from "fs"

async function main() {
  console.log("[v0] Starting demo...")

  // Get signers
  const [creator, counterparty, auditor] = await ethers.getSigners()
  console.log(`[v0] Creator: ${creator.address}`)
  console.log(`[v0] Counterparty: ${counterparty.address}`)
  console.log(`[v0] Auditor: ${auditor.address}`)

  // Load deployment info
  let ndaManagerAddress = ""
  if (fs.existsSync("deployment.json")) {
    const deployment = JSON.parse(fs.readFileSync("deployment.json", "utf-8"))
    ndaManagerAddress = deployment.contracts.NDAManager
  } else {
    console.error("[v0] deployment.json not found. Run 'npm run hardhat:deploy' first.")
    process.exit(1)
  }

  // Get contract instance
  const NDAManager = await ethers.getContractFactory("NDAManager")
  const ndaManager = NDAManager.attach(ndaManagerAddress)

  console.log("\n[v0] === Demo: Create NDA ===")

  // Create encrypted NDA
  const title = "Confidential Partnership Agreement"
  const encryptedTerms = ethers.toBeHex("0x" + Buffer.from("Confidential terms...").toString("hex"))
  const counterpartyEncrypted = ethers.toBeHex(counterparty.address)
  const expirationDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 days

  console.log(`[v0] Creating NDA with title: "${title}"`)
  console.log(`[v0] Counterparty: ${counterparty.address}`)
  console.log(`[v0] Expiration: ${new Date(expirationDate * 1000).toISOString()}`)

  const createTx = await ndaManager
    .connect(creator)
    .createNDA(title, encryptedTerms, counterpartyEncrypted, expirationDate)

  const createReceipt = await createTx.wait()
  console.log(`[v0] NDA created in tx: ${createReceipt?.hash}`)

  // Get NDA ID from events
  const events = await ndaManager.queryFilter("NDACreated")
  const lastEvent = events[events.length - 1]
  const ndaId = lastEvent.args?.[0]
  console.log(`[v0] NDA ID: ${ndaId}`)

  console.log("\n[v0] === Demo: Request Signature ===")

  // Request signature from counterparty
  const requestTx = await ndaManager.connect(creator).requestSignature(ndaId, counterparty.address)
  await requestTx.wait()
  console.log(`[v0] Signature requested from counterparty`)

  // Check NDA status
  let nda = await ndaManager.getNDA(ndaId)
  console.log(`[v0] NDA Status: ${nda.status}`)

  console.log("\n[v0] === Demo: Sign NDA ===")

  // Sign NDA as counterparty
  const signTx = await ndaManager.connect(counterparty).signNDA(ndaId)
  await signTx.wait()
  console.log(`[v0] NDA signed by counterparty`)

  // Check updated status
  nda = await ndaManager.getNDA(ndaId)
  console.log(`[v0] NDA Status: ${nda.status}`)
  console.log(`[v0] Signed At: ${new Date(Number(nda.signedAt) * 1000).toISOString()}`)

  console.log("\n[v0] === Demo: Grant Auditor Access ===")

  // Grant auditor access
  const grantTx = await ndaManager.connect(creator).grantAuditorAccess(ndaId, auditor.address)
  await grantTx.wait()
  console.log(`[v0] Auditor access granted`)

  // Check auditor permission
  const hasPermission = await ndaManager.hasPermission(ndaId, auditor.address)
  console.log(`[v0] Auditor has permission: ${hasPermission}`)

  console.log("\n[v0] === Demo: Query User NDAs ===")

  // Get creator's NDAs
  const creatorNDAs = await ndaManager.getUserNDAs(creator.address)
  console.log(`[v0] Creator has ${creatorNDAs.length} NDA(s)`)

  // Get counterparty's NDAs
  const counterpartyNDAs = await ndaManager.getUserNDAs(counterparty.address)
  console.log(`[v0] Counterparty has ${counterpartyNDAs.length} NDA(s)`)

  // Get auditor's NDAs
  const auditorNDAs = await ndaManager.getUserNDAs(auditor.address)
  console.log(`[v0] Auditor has ${auditorNDAs.length} NDA(s)`)

  console.log("\n[v0] === Demo: Check NDA Active Status ===")

  const isActive = await ndaManager.isNDAActive(ndaId)
  console.log(`[v0] NDA is active: ${isActive}`)

  console.log("\n[v0] === Demo: Terminate NDA ===")

  // Terminate NDA
  const terminateTx = await ndaManager.connect(creator).terminateNDA(ndaId)
  await terminateTx.wait()
  console.log(`[v0] NDA terminated`)

  // Check final status
  nda = await ndaManager.getNDA(ndaId)
  console.log(`[v0] Final NDA Status: ${nda.status}`)

  const isFinalActive = await ndaManager.isNDAActive(ndaId)
  console.log(`[v0] NDA is active: ${isFinalActive}`)

  console.log("\n[v0] Demo completed successfully!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[v0] Demo failed:", error)
    process.exit(1)
  })
