import axios from "axios"
import type { NDAData } from "../types"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function encryptData(data: string, dataType: string) {
  const response = await apiClient.post("/api/encrypt", {
    data,
    dataType,
  })
  return response.data
}

export async function decryptData(encrypted: string, encryptionKey: string, userAddress: string) {
  const response = await apiClient.post("/api/decrypt", {
    encrypted,
    encryptionKey,
    userAddress,
  })
  return response.data
}

export async function encryptWithFHEVM(data: string, dataType: string) {
  const response = await apiClient.post("/api/fhevm/encrypt", {
    data,
    dataType,
  })
  return response.data
}

export async function decryptWithFHEVM(encrypted: string, userAddress: string, ndaId: string) {
  const response = await apiClient.post("/api/fhevm/decrypt", {
    encrypted,
    userAddress,
    ndaId,
  })
  return response.data
}

export async function createNDA(ndaData: NDAData) {
  const response = await apiClient.post("/api/nda/create", ndaData)
  return response.data
}

export async function getNDA(ndaId: string, userAddress: string, encryptedData: string) {
  const response = await apiClient.get(`/api/nda/${ndaId}`, {
    params: {
      userAddress,
      encryptedData,
    },
  })
  return response.data
}

export async function signNDA(ndaId: string, userAddress: string, signature: string) {
  const response = await apiClient.post(`/api/nda/${ndaId}/sign`, {
    userAddress,
    signature,
  })
  return response.data
}

export async function terminateNDA(ndaId: string, userAddress: string) {
  const response = await apiClient.post(`/api/nda/${ndaId}/terminate`, {
    userAddress,
  })
  return response.data
}

export async function grantAuditorAccess(ndaId: string, auditorAddress: string, creatorAddress: string) {
  const response = await apiClient.post(`/api/nda/${ndaId}/grant-auditor`, {
    auditorAddress,
    creatorAddress,
  })
  return response.data
}

export async function checkComputationStatus(requestId: string) {
  const response = await apiClient.get(`/api/computation/${requestId}`)
  return response.data
}
