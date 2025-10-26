export interface WalletState {
  address: string | null
  isConnected: boolean
  chainId: number | null
}

export interface NDA {
  ndaId: string
  title: string
  creator: string
  counterparty: string
  status: "DRAFT" | "PENDING_SIGNATURE" | "SIGNED" | "EXPIRED" | "TERMINATED"
  createdAt: number
  signedAt?: number
  expirationDate: number
}

export interface NDAForm {
  title: string
  terms: string
  counterpartyAddress: string
  expirationDate: string
}

export interface EncryptedNDA {
  ndaId: string
  encryptedTerms: string
  encryptionKey: string
  counterpartyEncrypted: string
}

export interface UserRole {
  role: "creator" | "counterparty" | "auditor"
  ndaIds: string[]
}
