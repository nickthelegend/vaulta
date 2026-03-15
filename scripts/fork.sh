#!/bin/bash
# Load alchemy key from .env.local
export $(grep -v '^#' .env.local | xargs)

echo "🔱 Starting Anvil fork of Base mainnet..."
echo "RPC: http://localhost:8545"
echo "Chain ID: 8453"
echo "Block time: 2 seconds"

anvil \
  --fork-url https://base-mainnet.g.alchemy.com/v2/$ALCHEMY_KEY \
  --chain-id 8453 \
  --port 8545 \
  --block-time 2 \
  --accounts 10 \
  --balance 10000 \
  --mnemonic "test test test test test test test test test test test junk"
