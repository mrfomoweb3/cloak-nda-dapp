# CloakNDA Demo UI

A simple, interactive demo showcasing the CloakNDA system workflow without backend dependencies.

## Features

- **👨‍💼 Creator Interface**: Create and manage NDAs with encryption simulation
- **🤝 Counterparty Interface**: Review and sign NDAs with decryption demo
- **🔍 Auditor Interface**: View audit trails and system statistics
- **🔐 Encryption Simulation**: Visual demonstration of fhEVM encryption process
- **📋 Real-time Updates**: Interactive state management across all roles

## How to Run

Simply open `index.html` in your web browser. No server or dependencies required!

```bash
# Option 1: Direct file open
open demo/index.html

# Option 2: Simple HTTP server
cd demo
python -m http.server 8000
# Then visit http://localhost:8000
```

## Demo Workflow

### 1. Creator Flow
1. Switch to "Creator" role
2. Fill in NDA details (title, counterparty address, terms)
3. Click "Create Encrypted NDA"
4. Watch the encryption process simulation
5. See the NDA appear in your created NDAs list

### 2. Counterparty Flow
1. Switch to "Counterparty" role
2. See pending NDAs from creators
3. Click on an NDA to review
4. Watch the decryption process
5. Sign the NDA when ready

### 3. Auditor Flow
1. Switch to "Auditor" role
2. View system statistics
3. Select any NDA to view its complete audit trail
4. See all actions and timestamps

## Key Demo Features

- **Simulated Encryption**: Shows step-by-step fhEVM encryption process
- **Interactive State**: Actions in one role affect other roles
- **Visual Feedback**: Color-coded status indicators and animations
- **Realistic Data**: Uses actual Ethereum addresses and realistic content
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **HTML5**: Structure and semantics
- **Tailwind CSS**: Styling and responsive design
- **Vanilla JavaScript**: Interactive functionality and state management
- **CSS Animations**: Smooth transitions and visual feedback

This demo provides a complete overview of the CloakNDA system without requiring any blockchain setup or backend services.