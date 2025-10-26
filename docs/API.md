# Backend API Documentation

## Endpoints

### POST /api/encrypt
Encrypt plaintext data using fhEVM.

**Request:**
\`\`\`json
{
  "data": "sensitive NDA content",
  "dataType": "string"
}
\`\`\`

**Response:**
\`\`\`json
{
  "encrypted": "0x...",
  "encryptionKey": "0x...",
  "timestamp": 1234567890
}
\`\`\`

### POST /api/decrypt
Decrypt encrypted data (requires authorization).

**Request:**
\`\`\`json
{
  "encrypted": "0x...",
  "encryptionKey": "0x...",
  "userAddress": "0x..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "decrypted": "sensitive NDA content",
  "authorized": true
}
\`\`\`

### POST /api/nda/create
Create new NDA with encrypted terms.

**Request:**
\`\`\`json
{
  "title": "NDA Title",
  "terms": "encrypted terms",
  "counterpartyAddress": "0x...",
  "expirationDate": 1234567890
}
\`\`\`

**Response:**
\`\`\`json
{
  "ndaId": "0x...",
  "transactionHash": "0x...",
  "status": "pending"
}
\`\`\`

### GET /api/nda/:ndaId
Retrieve NDA details (decrypted for authorized users).

**Response:**
\`\`\`json
{
  "ndaId": "0x...",
  "creator": "0x...",
  "counterparty": "0x...",
  "title": "NDA Title",
  "terms": "decrypted terms",
  "status": "active",
  "createdAt": 1234567890
}
\`\`\`

### POST /api/nda/:ndaId/sign
Sign NDA as counterparty.

**Request:**
\`\`\`json
{
  "signature": "0x..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "status": "signed",
  "signedAt": 1234567890
}
