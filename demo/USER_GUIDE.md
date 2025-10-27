# 📖 CloakNDA Demo User Guide

## 🚀 Getting Started

### Quick Start
1. Open `demo/index.html` in your web browser
2. No installation or setup required - it's a standalone demo
3. The demo starts in **Creator** mode by default
4. Switch between roles using the top navigation buttons

### Demo Overview
This interactive demo showcases the complete CloakNDA workflow across three user types:
- **👨‍💼 Creator**: Creates and manages NDAs
- **🤝 Counterparty**: Reviews and signs NDAs  
- **🔍 Auditor**: Monitors and audits NDA activities

---

## 👨‍💼 Creator Profile

### Purpose
The Creator is typically a company or individual who needs to share confidential information and wants to protect it with a legally binding NDA.

### What You Can Do
- Create new NDAs with encrypted terms
- Specify counterparty wallet addresses
- Set expiration dates for NDAs
- Monitor NDA status and signatures
- View all created NDAs in one dashboard

### Step-by-Step Walkthrough

#### 1. Creating Your First NDA
```
📝 Fill out the form:
├── NDA Title: "Software Development NDA" 
├── Counterparty Address: 0x742d35Cc6634C0532925a3b8D4C9db96590c6C87
├── NDA Terms: "Confidential software development terms..."
└── Expiration Date: Select future date
```

#### 2. Watch the Encryption Process
After clicking "🔒 Create Encrypted NDA", you'll see:
```
🔄 Encryption Steps:
├── Step 1: Input Validation (Yellow) - Checking form data
├── Step 2: fhEVM Encryption (Blue) - Encrypting sensitive data  
├── Step 3: Smart Contract Call (Purple) - Storing on blockchain
└── Step 4: Blockchain Storage (Green) - ✅ Success!
```

#### 3. Managing Your NDAs
- View all created NDAs in the right panel
- See status indicators: `PENDING`, `SIGNED`, `EXPIRED`
- Track creation timestamps
- Monitor which NDAs need attention

### Key Features Demonstrated
- **🔐 Homomorphic Encryption**: Terms are encrypted before blockchain storage
- **📋 Status Tracking**: Real-time updates on NDA lifecycle
- **🔗 Blockchain Integration**: Immutable storage simulation
- **👥 Multi-party Management**: Handle multiple counterparties

---

## 🤝 Counterparty Profile

### Purpose
The Counterparty is the recipient of confidential information who needs to review and digitally sign the NDA before accessing sensitive data.

### What You Can Do
- View pending NDAs requiring your signature
- Decrypt and review NDA terms (with proper permissions)
- Digitally sign NDAs on the blockchain
- Track your signed NDA history

### Step-by-Step Walkthrough

#### 1. Viewing Pending NDAs
```
📨 Pending NDAs Section:
├── Shows NDAs waiting for your signature
├── Displays creator's wallet address (truncated)
├── Click any NDA card to begin review process
└── "No pending NDAs" if none available
```

#### 2. Reviewing an NDA
Click on any pending NDA to trigger the decryption process:
```
🔓 Decryption Steps:
├── Step 1: Permission Verification (Yellow) - Checking access rights
├── Step 2: fhEVM Decryption (Blue) - Decrypting your copy
└── Step 3: Content Display (Green) - Showing readable terms
```

#### 3. Reading Decrypted Terms
Once decryption completes:
- **📄 Decrypted NDA Terms** panel appears
- Read the full confidential terms
- Terms are only visible to authorized parties
- Review all conditions carefully

#### 4. Signing the NDA
- Click "✍️ Sign NDA" button when ready
- Digital signature is recorded on blockchain
- NDA moves to "Signed NDAs" section
- Success confirmation appears

### Key Features Demonstrated
- **🔐 Encrypted Access Control**: Only authorized parties can decrypt
- **🔓 Selective Decryption**: Terms revealed only when needed
- **✍️ Digital Signatures**: Cryptographic proof of agreement
- **📋 History Tracking**: All signed NDAs in one place

---

## 🔍 Auditor Profile

### Purpose
The Auditor provides independent verification and compliance monitoring for NDA processes, ensuring transparency while maintaining confidentiality.

### What You Can Do
- View system-wide NDA statistics
- Access complete audit trails for any NDA
- Monitor compliance and activity patterns
- Verify the integrity of NDA processes

### Step-by-Step Walkthrough

#### 1. System Overview Dashboard
```
📊 NDA Statistics:
├── Total NDAs: Shows count of all NDAs in system
├── Signed NDAs: Count of completed agreements
├── Visual metrics with color-coded indicators
└── Real-time updates as system changes
```

#### 2. Selecting NDAs for Audit
```
🔍 NDA Selection:
├── List of all NDAs in the system
├── Shows current status for each
├── Click any NDA to view its audit trail
└── Organized by creation order
```

#### 3. Viewing Audit Trails
When you select an NDA, you'll see:
```
📋 Complete Audit Trail:
├── NDA Created - Original creator action
├── Encrypted Storage - fhEVM coprocessor action  
├── NDA Signed - Counterparty signature (if applicable)
├── Timestamps for all actions
└── Actor addresses for accountability
```

### Key Features Demonstrated
- **📊 System Transparency**: Complete visibility into NDA lifecycle
- **🔍 Immutable Audit Trail**: Blockchain-based activity log
- **👥 Multi-party Accountability**: Track all participant actions
- **⏰ Temporal Tracking**: Precise timestamps for compliance

---

## 🎯 Demo Workflow Examples

### Complete NDA Lifecycle Demo

#### Scenario: Software Development NDA
```
1. 👨‍💼 Creator Creates NDA
   ├── Title: "Mobile App Development NDA"
   ├── Terms: "Confidential mobile app source code and designs"
   └── Counterparty: Development contractor

2. 🤝 Counterparty Reviews & Signs  
   ├── Receives notification of pending NDA
   ├── Decrypts and reviews terms
   └── Digitally signs agreement

3. 🔍 Auditor Verifies Process
   ├── Confirms proper encryption was used
   ├── Verifies all parties signed correctly
   └── Validates audit trail integrity
```

### Multi-NDA Management Demo
```
Create Multiple NDAs:
├── NDA #1: Software Development (Pending)
├── NDA #2: Marketing Partnership (Signed)  
├── NDA #3: Investment Terms (Pending)
└── Switch roles to see different perspectives
```

---

## 🔐 Security Features Demonstrated

### Encryption Simulation
- **Visual Process**: See step-by-step encryption workflow
- **fhEVM Integration**: Demonstrates homomorphic encryption concepts
- **Zero Knowledge**: Terms encrypted before blockchain storage

### Access Control
- **Role-Based Permissions**: Each profile sees only relevant data
- **Encrypted Permissions**: Access rights stored encrypted on-chain
- **Selective Decryption**: Content revealed only to authorized parties

### Audit Trail
- **Immutable Logging**: All actions permanently recorded
- **Multi-party Accountability**: Track every participant's actions
- **Temporal Integrity**: Precise timestamps for all events

---

## 💡 Tips for Effective Demo Presentation

### For Technical Audiences
1. **Start with Creator** - Show the encryption process
2. **Highlight fhEVM** - Explain homomorphic encryption benefits
3. **Demonstrate Access Control** - Switch to Counterparty view
4. **Show Audit Trail** - Use Auditor profile for transparency

### For Business Audiences  
1. **Focus on Workflow** - Complete NDA lifecycle
2. **Emphasize Security** - Encrypted storage and access
3. **Highlight Compliance** - Audit trail capabilities
4. **Show Efficiency** - Digital process vs. paper NDAs

### Interactive Elements
- **Create Multiple NDAs** - Show scalability
- **Switch Roles Frequently** - Demonstrate different perspectives  
- **Use Realistic Data** - Make scenarios relatable
- **Explain Each Step** - Walk through encryption/decryption

---

## 🚀 Next Steps After Demo

### For Development
- Set up actual Zama fhEVM environment
- Implement real smart contracts
- Add MetaMask wallet integration
- Build production backend services

### For Business
- Define specific NDA requirements
- Plan integration with existing systems
- Consider compliance and legal requirements
- Evaluate deployment strategies

This demo provides a complete foundation for understanding how CloakNDA revolutionizes confidential document management using blockchain and homomorphic encryption technology.