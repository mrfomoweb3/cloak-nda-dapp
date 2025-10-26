export interface EncryptionRequest {
  data: string
  dataType: "string" | "address" | "uint64" | "bool"
}

export interface EncryptionResponse {
  encrypted: string
  encryptionKey: string
  timestamp: number
}

export interface DecryptionRequest {
  encrypted: string
  encryptionKey: string
  userAddress: string
}

export interface DecryptionResponse {
  decrypted: string
  authorized: boolean
}

export interface NDAData {
  title: string
  terms: string
  counterpartyAddress: string
  expirationDate: number
  createdBy: string
}

export interface NDAEncrypted {
  ndaId: string
  encryptedTerms: string
  encryptionKey: string
  counterpartyEncrypted: string
  metadata: {
    createdAt: number
    creator: string
  }
}

export interface CoprocessorCallback {
  requestId: string
  ndaId: string
  operation: "encrypt" | "decrypt" | "compute"
  status: "pending" | "completed" | "failed"
  result?: string
  error?: string
}
