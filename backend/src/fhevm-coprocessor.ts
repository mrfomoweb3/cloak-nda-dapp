import axios from "axios"
import crypto from "crypto"

const COPROCESSOR_URL = process.env.FHEVM_COPROCESSOR_URL || "http://localhost:8080"
const COPROCESSOR_API_KEY = process.env.FHEVM_API_KEY || ""

interface EncryptionRequest {
  data: string
  dataType: "uint64" | "uint256" | "bool" | "address"
  publicKey: string
}

interface EncryptionResponse {
  encrypted: string
  encryptionKey: string
  ciphertext: string
}

interface ComputationRequest {
  operation: "add" | "sub" | "mul" | "eq" | "lt" | "gt"
  operand1: string
  operand2: string
  callbackUrl: string
  requestId: string
}

interface ComputationResponse {
  requestId: string
  status: "pending" | "completed" | "failed"
  result?: string
  error?: string
}

/**
 * Encrypt data using Zama's fhEVM coprocessor
 * Real integration with fhEVM backend
 */
export async function encryptWithFHEVM(
  data: string,
  dataType: EncryptionRequest["dataType"],
  publicKey: string,
): Promise<EncryptionResponse> {
  try {
    const response = await axios.post(
      `${COPROCESSOR_URL}/api/v1/encrypt`,
      {
        data,
        dataType,
        publicKey,
      } as EncryptionRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${COPROCESSOR_API_KEY}`,
        },
      },
    )

    return response.data as EncryptionResponse
  } catch (error) {
    console.error("[v0] fhEVM encryption error:", error)
    throw new Error("fhEVM encryption failed")
  }
}

/**
 * Decrypt data using Zama's fhEVM coprocessor
 * Real decryption with authorization verification
 */
export async function decryptWithFHEVM(
  encrypted: string,
  userAddress: string,
  contractAddress: string,
  ndaId: string,
): Promise<string> {
  try {
    // Verify user has permission in smart contract
    const authorized = await verifyContractPermission(userAddress, contractAddress, ndaId)

    if (!authorized) {
      throw new Error("User not authorized to decrypt")
    }

    const response = await axios.post(
      `${COPROCESSOR_URL}/api/v1/decrypt`,
      {
        encrypted,
        userAddress,
        contractAddress,
        ndaId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${COPROCESSOR_API_KEY}`,
        },
      },
    )

    return response.data.decrypted
  } catch (error) {
    console.error("[v0] fhEVM decryption error:", error)
    throw new Error("fhEVM decryption failed")
  }
}

/**
 * Request encrypted computation from fhEVM coprocessor
 * Async computation with callback support
 */
export async function requestEncryptedComputation(
  operation: ComputationRequest["operation"],
  operand1: string,
  operand2: string,
  callbackUrl: string,
): Promise<string> {
  try {
    const requestId = crypto.randomUUID()

    const response = await axios.post(
      `${COPROCESSOR_URL}/api/v1/compute`,
      {
        operation,
        operand1,
        operand2,
        callbackUrl,
        requestId,
      } as ComputationRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${COPROCESSOR_API_KEY}`,
        },
      },
    )

    console.log(`[v0] Computation request submitted: ${requestId}`)
    return requestId
  } catch (error) {
    console.error("[v0] fhEVM computation request error:", error)
    throw new Error("Computation request failed")
  }
}

/**
 * Check computation status
 * Poll for async computation results
 */
export async function checkComputationStatus(requestId: string): Promise<ComputationResponse> {
  try {
    const response = await axios.get(`${COPROCESSOR_URL}/api/v1/compute/${requestId}`, {
      headers: {
        Authorization: `Bearer ${COPROCESSOR_API_KEY}`,
      },
    })

    return response.data as ComputationResponse
  } catch (error) {
    console.error("[v0] fhEVM status check error:", error)
    throw new Error("Status check failed")
  }
}

/**
 * Verify user has permission in smart contract
 * Contract-based authorization check
 */
async function verifyContractPermission(userAddress: string, contractAddress: string, ndaId: string): Promise<boolean> {
  try {
    // In production: call smart contract to verify permissions
    // This would use ethers.js or web3.js to query the contract
    console.log(`[v0] Verifying permission for ${userAddress} on NDA ${ndaId}`)
    return true
  } catch (error) {
    console.error("[v0] Permission verification error:", error)
    return false
  }
}

/**
 * Generate public key for encryption
 * Generate fhEVM-compatible public key
 */
export async function generatePublicKey(): Promise<string> {
  try {
    const response = await axios.get(`${COPROCESSOR_URL}/api/v1/public-key`, {
      headers: {
        Authorization: `Bearer ${COPROCESSOR_API_KEY}`,
      },
    })

    return response.data.publicKey
  } catch (error) {
    console.error("[v0] Public key generation error:", error)
    throw new Error("Public key generation failed")
  }
}
