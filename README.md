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

### 🎮 Experience CloakNDA Now

**No setup required!** Try our interactive demo to see all features in action:

**[🚀 Launch Interactive Demo](https://cloak-nda-dapp.vercel.app/)** | **[📖 Demo Guide](demo/USER_GUIDE.md)** | **[⚙️ Demo Setup](demo/README.md)**

The demo showcases the complete NDA lifecycle across all three user roles with simulated encryption/decryption processes.

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
├── 🎮 demo/                        # Interactive Demo (No Setup Required)
│   ├── index.html                  # Main demo interface
│   ├── demo.js                     # Interactive functionality
│   ├── README.md                   # Demo quick start guide
│   └── USER_GUIDE.md               # Complete demo walkthrough
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

## 🎮 Interactive Demo

**Try the CloakNDA system without any setup!** We've created a fully interactive demo that showcases all features.

### 🚀 Quick Demo Access

```bash
# No installation required - just open in browser
open demo/index.html

# Or serve locally
cd demo && python -m http.server 8000
# Visit: http://localhost:8000
```

### 📖 Demo Documentation

- **[Demo User Guide](demo/USER_GUIDE.md)** - Complete walkthrough of all profiles and features
- **[Demo README](demo/README.md)** - Quick start and technical details
- **[Live Demo](demo/index.html)** - Interactive browser-based demonstration

### 🎯 Demo Features

- **👨‍💼 Creator Interface** - Create NDAs with encryption simulation
- **🤝 Counterparty Interface** - Review and sign NDAs with decryption demo  
- **🔍 Auditor Interface** - View audit trails and system statistics
- **🔐 Encryption Visualization** - Step-by-step fhEVM process demonstration
- **📱 Responsive Design** - Works on all devices, no dependencies

### 💡 Perfect for:
- Client presentations and investor demos
- Technical proof-of-concept showcases  
- Educational workshops and training
- Understanding system workflows before development

---

## 🚀 Full Development Setup

### Prerequisites

Before you begin full development, ensure you have the following installed:

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

> **💡 See it in action**: Try our [Interactive Demo](demo/index.html) to experience these workflows firsthand!

### 1. **NDA Creation Flow**
```
Creator → Frontend Form → Backend Encryption → Smart Contract → Blockchain
```
- Creator fills out NDA details in the web interface
- Backend encrypts sensitive data using fhEVM
- Smart contract stores encrypted NDA on-chain
- Immutable audit trail is created

**🎮 [Try Creator Demo](demo/index.html)** - Experience the complete creation process with encryption visualization

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

**🎮 [Try Counterparty Demo](demo/index.html)** - See the decryption and signing process in action

### 4. **Audit Verification Flow**
```
Auditor → Request Access → Verify Permissions → View Audit Trail
```
- Auditor requests access to specific NDA
- System verifies encrypted permissions
- Complete audit trail is displayed

**🎮 [Try Auditor Demo](demo/index.html)** - Explore the complete audit trail interface

### 📖 Detailed Workflow Guide
For step-by-step instructions on using each interface, see our [Complete Demo User Guide](demo/USER_GUIDE.md)

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

## 📚 Documentation & Resources

### 🎮 Interactive Demo
- **[Live Demo](demo/index.html)** - Try CloakNDA in your browser (no setup required)
- **[Demo User Guide](demo/USER_GUIDE.md)** - Complete walkthrough of all features and profiles
- **[Demo README](demo/README.md)** - Technical details and customization guide

### 📖 Technical Documentation
- **[Architecture Guide](docs/ARCHITECTURE.md)** - Comprehensive system architecture and data flows
- **[API Documentation](docs/API.md)** - Complete backend API reference
- **[Presentation Guide](docs/PRESENTATION_GUIDE.md)** - Tips for effective demonstrations

### 🔧 API Reference

The backend provides RESTful APIs for frontend integration:

- `POST /api/encrypt` - Encrypt data using fhEVM
- `POST /api/decrypt` - Decrypt data (authorized users only)
- `POST /api/nda/create` - Create new encrypted NDA
- `GET /api/nda/:id` - Retrieve NDA details
- `POST /api/nda/:id/sign` - Sign NDA as counterparty

For detailed API documentation, see [docs/API.md](docs/API.md)

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


---

**⚠️ Important Note**: This is a proof-of-concept application for demonstration purposes. While it showcases real fhEVM capabilities, additional security audits and testing would be required for production use.
