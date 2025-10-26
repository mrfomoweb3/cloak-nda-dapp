import { ethers } from "hardhat"

async function main() {
  console.log("[v0] Starting deployment...")

  // Get deployer account
  const [deployer] = await ethers.getSigners()
  console.log(`[v0] Deploying contracts with account: ${deployer.address}`)

  // Deploy NDAManager contract
  console.log("[v0] Deploying NDAManager...")
  const NDAManager = await ethers.getContractFactory("NDAManager")
  const ndaManager = await NDAManager.deploy()
  await ndaManager.waitForDeployment()
  const ndaManagerAddress = await ndaManager.getAddress()
  console.log(`[v0] NDAManager deployed to: ${ndaManagerAddress}`)

  // Deploy AuditTrail contract
  console.log("[v0] Deploying AuditTrail...")
  const AuditTrail = await ethers.getContractFactory("AuditTrail")
  const auditTrail = await AuditTrail.deploy()
  await auditTrail.waitForDeployment()
  const auditTrailAddress = await auditTrail.getAddress()
  console.log(`[v0] AuditTrail deployed to: ${auditTrailAddress}`)

  // Save deployment addresses
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      NDAManager: ndaManagerAddress,
      AuditTrail: auditTrailAddress,
    },
  }

  console.log("\n[v0] Deployment Summary:")
  console.log(JSON.stringify(deploymentInfo, null, 2))

  // Save to file
  const fs = await import("fs")
  fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2))

  console.log("[v0] Deployment info saved to deployment.json")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[v0] Deployment failed:", error)
    process.exit(1)
  })
