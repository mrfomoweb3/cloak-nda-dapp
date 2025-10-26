# 🔐 CloakNDA - Confidential NDA Management dApp

> **A production-grade Web3 application demonstrating Fully Homomorphic Encryption (fhEVM) for confidential NDA management on blockchain.**

CloakNDA is a proof-of-concept decentralized application that showcases how sensitive legal documents can be managed on-chain while maintaining complete confidentiality through Zama's fhEVM (Fully Homomorphic Encryption Virtual Machine).

## 🌟 Key Features

- **🔒 Fully Encrypted Storage**: All sensitive NDA data is encrypted on-chain using homomorphic encryption
- **👥 Role-Based Access Control**: Separate interfaces for Creators, Counterparties, and Auditors
- **🧮 Confidential Computations**: Perform operations on encrypted data without ever decrypting it
- **📋 Immutable Audit Trail**: Complete blockchain-based audit log of all NDA interactions
- **🌐 Web3 Integration**: Seamless MetaMask wallet connection and transaction signing
- **⚡ Real-time Updates**: Live status updates and notifications for all parties

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    🖥️  React Frontend (Next.js)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Creator   │  │Counterparty │  │   Auditor   │             │
│  │  Dashboard  │  │ Interface   │  │    Panel    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              ↕️ REST API
┌─────────────────────────────────────────────────────────────────┐
│              🔧 Backend Coprocessor (Node.js/Express)           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  • fhEVM Encryption/Decryption Handler                 │   │
│  │  • Async Callback Processing                           │   │
│  │  • Key Management & Security                           │   │
│  │  • REST API Endpoints                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕️ Encrypted Operations
┌─────────────────────────────────────────────────────────────────┐
│           🔐 Zama fhEVM Coprocessor (Encrypted VM)              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  • Homomorphic Encryption Operations                   │   │
│  │  • Confidential Computations                           │   │
│  │  • Zero Plaintext Exposure                             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕️ Smart Contract Calls
┌─────────────────────────────────────────────────────────────────┐
│         📜 Smart Contracts (Solidity + fhEVM Types)             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  NDAManager.sol - Main NDA lifecycle management        │   │
│  │  EncryptedComputation.sol - Advanced fhEVM operations  │   │
│  │  AuditTrail.sol - Immutable audit logging              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕️ Blockchain Storage
┌─────────────────────────────────────────────────────────────────┐
│              ⛓️  Zama Devnet / Testnet Blockchain               │
│  • Encrypted NDA Records     • Transaction History             │
│  • Access Control Lists      • Audit Trail Logs               │
│  • Homomorphic Computations  • Smart Contract State           │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
cloakNDA/
├── 📜 contracts/                    # Smart Contracts (Solidity + fhEVM)
│   ├── NDAManager.sol              # Main NDA lifecycle management
│   ├── EncryptedComputation.sol    # Advanced encrypted operations
│   └── AuditTrail.sol              # Immutable audit logging
│
├── 🖥️ app/                         # Next.js Frontend Application
│   ├── layout.tsx                  # Root layout component
│   └── page.tsx                    # Main application page
│
├── ⚛️ src/                         # React Components & Logic
│   ├── components/                 # UI Components
│   │   ├── WalletConnect.tsx       # MetaMask integration
│   │   ├── CreatorDashboard.tsx    # NDA creation interface
│   │   ├── CounterpartyInterface.tsx # NDA review interface
│   │   └── AuditorPanel.tsx        # Audit verification panel
│   ├── store/                      # State management (Zustand)
│   ├── api/                        # API integration layer
│   └── types/                      # TypeScript definitions
│
├── 🔧 backend/                     # Node.js Backend Services
│   └── src/
│       ├── server.ts               # Express server setup
│       ├── fhevm-coprocessor.ts    # fhEVM integration
│       ├── encryption.ts           # Encryption utilities
│       ├── nda-service.ts          # Business logic
│       └── types.ts                # Backend type definitions
│
├── 🧪 test/                        # Test Suites
├── 📚 docs/                        # Documentation
│   ├── ARCHITECTURE.md             # Detailed architecture guide
│   ├── API.md                      # Backend API documentation
│   └── PRESENTATION_GUIDE.md       # Demo presentation guide
│
├── 🛠️ scripts/                     # Deployment & Utility Scripts
├── 🎨 styles/                      # CSS & Styling
├── 🔧 hardhat.config.ts            # Hardhat configuration
├── 📦 package.json                 # Dependencies & scripts
└── 🔐 deployment.example.json      # Deployment configuration
```

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - JavaScript runtime
- **pnpm** - Fast, disk space efficient package manager
- **Docker** - For running Zama fhEVM Devnet
- **MetaMask** - Browser wallet extension

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd cloakNDA

# Install dependencies
pnpm install

# Install backend dependencies
cd backend && pnpm install && cd ..
```

### 2. Start Zama fhEVM Devnet

```bash
# Terminal 1: Start the encrypted blockchain
docker run -p 8545:8545 zama/fhEVM-devnet
```

### 3. Deploy Smart Contracts

```bash
# Terminal 2: Compile and deploy contracts
pnpm hardhat:compile
pnpm hardhat:deploy
```

### 4. Start Backend Services

```bash
# Terminal 3: Start the coprocessor backend
cd backend
pnpm dev
```

### 5. Launch Frontend

```bash
# Terminal 4: Start the React application
pnpm dev
```

### 6. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 🎯 How It Works

### 1. **NDA Creation Flow**
```
Creator → Frontend Form → Backend Encryption → Smart Contract → Blockchain
```
- Creator fills out NDA details in the web interface
- Backend encrypts sensitive data using fhEVM
- Smart contract stores encrypted NDA on-chain
- Immutable audit trail is created

### 2. **Signature Request Flow**
```
Creator → Request Signature → Encrypted Notification → Counterparty Access
```
- Creator requests signature from counterparty
- System grants encrypted access permissions
- Counterparty receives notification and access rights

### 3. **NDA Signing Flow**
```
Counterparty → Review Encrypted NDA → Sign → Update Blockchain State
```
- Counterparty reviews decrypted NDA (authorized access only)
- Digital signature is recorded on-chain
- All parties receive status updates

### 4. **Audit Verification Flow**
```
Auditor → Request Access → Verify Permissions → View Audit Trail
```
- Auditor requests access to specific NDA
- System verifies encrypted permissions
- Complete audit trail is displayed

## 🔐 Security Features

### Encryption at Rest
- All sensitive NDA data is encrypted using Zama's fhEVM before blockchain storage
- Private keys never leave the secure coprocessor environment
- Zero plaintext exposure in logs, storage, or network transmission

### Access Control
- Role-based permissions enforced at the smart contract level
- Encrypted permission checks prevent unauthorized access
- Granular access control for different user roles

### Audit Trail
- Immutable blockchain-based audit log
- Every action is cryptographically signed and timestamped
- Complete transparency while maintaining confidentiality

### Homomorphic Computations
- Perform operations on encrypted data without decryption
- Compare encrypted values, perform calculations
- Maintain data confidentiality throughout the entire process

## 🧪 Testing

### Run Smart Contract Tests
```bash
pnpm test
```

### Run Backend Tests
```bash
cd backend
pnpm test
```

### Run Integration Tests
```bash
pnpm test:integration
```

## 🚀 Deployment

### Testnet Deployment
```bash
# Deploy to Zama Testnet
pnpm hardhat:deploy --network zama-testnet
```

### Production Deployment
```bash
# Build for production
pnpm build

# Deploy backend
cd backend && pnpm build && pnpm start

# Deploy frontend (example with Vercel)
vercel deploy
```

## 🛠️ Development Scripts

```bash
# Smart Contract Development
pnpm hardhat:compile          # Compile contracts
pnpm hardhat:deploy           # Deploy to devnet
pnpm hardhat:demo             # Run demo script
pnpm test                     # Run contract tests

# Frontend Development
pnpm dev                      # Start development server
pnpm build                    # Build for production
pnpm preview                  # Preview production build

# Backend Development
cd backend
pnpm dev                      # Start backend with hot reload
pnpm build                    # Build backend
pnpm start                    # Start production backend
```

## 📚 API Documentation

The backend provides RESTful APIs for frontend integration:

- `POST /api/encrypt` - Encrypt data using fhEVM
- `POST /api/decrypt` - Decrypt data (authorized users only)
- `POST /api/nda/create` - Create new encrypted NDA
- `GET /api/nda/:id` - Retrieve NDA details
- `POST /api/nda/:id/sign` - Sign NDA as counterparty

For detailed API documentation, see [docs/API.md](docs/API.md)

## 🏛️ Architecture Details

For comprehensive architecture documentation including data flows, security models, and component interactions, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 🎨 Tech Stack

### Frontend
- **Next.js 16** - React framework with SSR
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Ethers.js** - Ethereum library for Web3 integration

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **TypeScript** - Type-safe server development
- **Axios** - HTTP client for API calls

### Blockchain
- **Solidity 0.8.24** - Smart contract language
- **Hardhat** - Ethereum development environment
- **Zama fhEVM** - Fully homomorphic encryption VM
- **Ethers.js** - Blockchain interaction library

### Infrastructure
- **Docker** - Containerization for Zama Devnet
- **Vite** - Fast build tool and dev server
- **ESLint & Prettier** - Code quality and formatting

## 🤝 Contributing

This is a proof-of-concept application demonstrating fhEVM capabilities. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- **Zama** - For providing the fhEVM technology that makes this possible
- **Ethereum Foundation** - For the underlying blockchain infrastructure
- **Next.js Team** - For the excellent React framework

---

**⚠️ Important Note**: This is a proof-of-concept application for demonstration purposes. While it showcases real fhEVM capabilities, additional security audits and testing would be required for production use.