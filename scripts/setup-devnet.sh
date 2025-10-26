#!/bin/bash

# CloakNDA Devnet Setup Script

echo "[v0] CloakNDA Devnet Setup"
echo "[v0] ====================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "[v0] Docker is not installed. Please install Docker first."
    exit 1
fi

echo "[v0] Starting Zama fhEVM Devnet..."
docker run -d \
  --name zama-devnet \
  -p 8545:8545 \
  zama/fhEVM-devnet:latest

echo "[v0] Waiting for Devnet to be ready..."
sleep 10

echo "[v0] Checking Devnet connection..."
curl -s http://localhost:8545 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' | grep -q "result"

if [ $? -eq 0 ]; then
    echo "[v0] Devnet is ready!"
else
    echo "[v0] Failed to connect to Devnet"
    exit 1
fi

echo "[v0] Installing dependencies..."
npm install

echo "[v0] Compiling contracts..."
npm run hardhat:compile

echo "[v0] Deploying contracts..."
npm run hardhat:deploy

echo "[v0] Setup complete!"
echo "[v0] You can now run: npm run hardhat:demo"
