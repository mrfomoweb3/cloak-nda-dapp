import express, { type Request, type Response } from "express"
import cors from "cors"
import {
  createEncryptedNDA,
  getDecryptedNDA,
  signNDA,
  terminateNDA,
  grantAuditorAccess,
  checkComputationResult,
} from "./nda-service"
import type { NDAData } from "./types"

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

app.post("/api/fhevm/encrypt", async (req: Request, res: Response) => {
  try {
    const { data, dataType } = req.body

    if (!data || !dataType) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Encryption is handled by fhEVM coprocessor
    res.json({
      status: "encryption_requested",
      message: "Data will be encrypted by fhEVM coprocessor",
    })
  } catch (error) {
    console.error("[v0] fhEVM encryption error:", error)
    res.status(500).json({ error: "Encryption failed" })
  }
})

app.post("/api/fhevm/decrypt", async (req: Request, res: Response) => {
  try {
    const { encrypted, userAddress, ndaId } = req.body

    if (!encrypted || !userAddress || !ndaId) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Decryption is handled by fhEVM coprocessor with authorization check
    res.json({
      status: "decryption_requested",
      message: "Data will be decrypted by fhEVM coprocessor after authorization",
    })
  } catch (error) {
    console.error("[v0] fhEVM decryption error:", error)
    res.status(500).json({ error: "Decryption failed" })
  }
})

// Create NDA endpoint
app.post("/api/nda/create", async (req: Request, res: Response) => {
  try {
    const ndaData = req.body as NDAData

    if (!ndaData.title || !ndaData.terms || !ndaData.counterpartyAddress) {
      return res.status(400).json({ error: "Missing required NDA fields" })
    }

    const encrypted = await createEncryptedNDA(ndaData)
    res.json({
      ndaId: encrypted.ndaId,
      status: "created",
      encryptedTerms: encrypted.encryptedTerms,
      message: "NDA created with fhEVM encryption",
    })
  } catch (error) {
    console.error("[v0] NDA creation error:", error)
    res.status(500).json({ error: "NDA creation failed" })
  }
})

// Get NDA endpoint
app.get("/api/nda/:ndaId", async (req: Request, res: Response) => {
  try {
    const { ndaId } = req.params
    const { userAddress, encryptedData } = req.query

    if (!userAddress || !encryptedData) {
      return res.status(400).json({ error: "Missing authorization parameters" })
    }

    const nda = await getDecryptedNDA(ndaId, userAddress as string, encryptedData as string)

    if (!nda) {
      return res.status(403).json({ error: "Access denied" })
    }

    res.json(nda)
  } catch (error) {
    console.error("[v0] NDA retrieval error:", error)
    res.status(500).json({ error: "Failed to retrieve NDA" })
  }
})

// Sign NDA endpoint
app.post("/api/nda/:ndaId/sign", async (req: Request, res: Response) => {
  try {
    const { ndaId } = req.params
    const { userAddress, signature } = req.body

    if (!userAddress || !signature) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const success = await signNDA(ndaId, userAddress, signature)

    if (!success) {
      return res.status(400).json({ error: "Failed to sign NDA" })
    }

    res.json({ status: "signed", ndaId, message: "NDA signing initiated with fhEVM verification" })
  } catch (error) {
    console.error("[v0] NDA signing error:", error)
    res.status(500).json({ error: "Failed to sign NDA" })
  }
})

// Terminate NDA endpoint
app.post("/api/nda/:ndaId/terminate", async (req: Request, res: Response) => {
  try {
    const { ndaId } = req.params
    const { userAddress } = req.body

    if (!userAddress) {
      return res.status(400).json({ error: "Missing user address" })
    }

    const success = await terminateNDA(ndaId, userAddress)

    if (!success) {
      return res.status(400).json({ error: "Failed to terminate NDA" })
    }

    res.json({ status: "terminated", ndaId, message: "NDA termination initiated with fhEVM" })
  } catch (error) {
    console.error("[v0] NDA termination error:", error)
    res.status(500).json({ error: "Failed to terminate NDA" })
  }
})

// Grant auditor access endpoint
app.post("/api/nda/:ndaId/grant-auditor", async (req: Request, res: Response) => {
  try {
    const { ndaId } = req.params
    const { auditorAddress, creatorAddress } = req.body

    if (!auditorAddress || !creatorAddress) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const success = await grantAuditorAccess(ndaId, auditorAddress, creatorAddress)

    if (!success) {
      return res.status(400).json({ error: "Failed to grant access" })
    }

    res.json({
      status: "access_granted",
      ndaId,
      auditorAddress,
      message: "Auditor access granted with fhEVM encryption",
    })
  } catch (error) {
    console.error("[v0] Auditor access error:", error)
    res.status(500).json({ error: "Failed to grant auditor access" })
  }
})

app.post("/api/computation-callback", async (req: Request, res: Response) => {
  try {
    const { requestId, result, error } = req.body

    if (!requestId) {
      return res.status(400).json({ error: "Missing request ID" })
    }

    if (error) {
      console.error(`[v0] Computation error for request ${requestId}: ${error}`)
      return res.json({ status: "error", requestId, error })
    }

    console.log(`[v0] Computation completed for request ${requestId}`)
    console.log(`[v0] Result: ${result}`)

    // In production: update database, trigger contract call, notify frontend
    res.json({ status: "callback_received", requestId, result })
  } catch (error) {
    console.error("[v0] Callback handling error:", error)
    res.status(500).json({ error: "Callback processing failed" })
  }
})

app.get("/api/computation/:requestId", async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params

    const result = await checkComputationResult(requestId)

    if (!result) {
      return res.status(404).json({ error: "Computation not found" })
    }

    res.json(result)
  } catch (error) {
    console.error("[v0] Computation status error:", error)
    res.status(500).json({ error: "Failed to check computation status" })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`[v0] Backend server running on port ${PORT}`)
  console.log(`[v0] fhEVM coprocessor integration enabled`)
})
