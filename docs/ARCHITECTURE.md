# CloakNDA Architecture

## System Overview

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend (Vite)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Creator    │  │ Counterparty │  │   Auditor    │      │
│  │  Dashboard   │  │  Interface   │  │    Panel     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend Coprocessor (Node.js)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Encryption/Decryption Handler                       │  │
│  │  - Manages fhEVM key material                        │  │
│  │  - Async callback processing                        │  │
│  │  - REST API for frontend                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│           Zama fhEVM Coprocessor (Encrypted VM)             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Performs computations on encrypted data             │  │
│  │  - No plaintext exposure                             │  │
│  │  - Homomorphic operations                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│         Smart Contracts (Solidity + fhEVM Types)            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  NDAManager.sol                                      │  │
│  │  - Encrypted state management                        │  │
│  │  - Access control                                    │  │
│  │  - Audit trail                                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Zama Devnet / Testnet Blockchain               │
│  - Immutable NDA records                                    │
│  - Encrypted data storage                                  │
│  - Transaction history                                     │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Data Flow

### NDA Creation Flow
1. Creator fills NDA form in React frontend
2. Frontend sends plaintext to backend coprocessor
3. Backend encrypts data using fhEVM
4. Backend calls smart contract with encrypted data
5. Contract stores encrypted NDA on-chain
6. Audit trail recorded

### NDA Access Flow
1. Counterparty requests NDA access
2. Contract checks encrypted permissions
3. Backend decrypts data for authorized user
4. Frontend displays decrypted NDA
5. Access logged to audit trail

## Security Model

- **Encryption**: All sensitive data encrypted at rest using fhEVM
- **Access Control**: Role-based permissions enforced at contract level
- **Audit Trail**: Immutable record of all operations
- **No Plaintext**: Sensitive data never exposed in logs or storage

## Component Responsibilities

### Frontend (React)
- User interface for all roles
- Wallet connection and transaction signing
- Form validation and UX

### Backend (Node.js)
- Encryption/decryption orchestration
- fhEVM coprocessor communication
- REST API for frontend
- Error handling and logging

### Smart Contracts (Solidity)
- Encrypted state management
- Access control enforcement
- Audit trail recording
- Business logic execution

### fhEVM Coprocessor
- Homomorphic encryption operations
- Encrypted computation execution
- Key management
