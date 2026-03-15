# Local Fork Testing Instructions

### Step 1 — Install Foundry (one time)
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Step 2 — Fork Base mainnet locally
```bash
anvil \
  --fork-url https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY \
  --chain-id 8453 \
  --port 8545 \
  --block-time 2
```

### Step 3 — Fund your test wallet with USDC
1. Find a USDC whale on Basescan first.
2. Impersonate the whale:
```bash
cast rpc anvil_impersonateAccount 0xWHALE_ADDRESS --rpc-url http://localhost:8545
```
3. Send USDC to your test wallet:
```bash
cast send 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 \
  "transfer(address,uint256)" \
  0xYOUR_TEST_WALLET \
  10000000000 \
  --from 0xWHALE_ADDRESS \
  --rpc-url http://localhost:8545
```

### Step 4 — Point your app to local fork
In `.env.local`:
```bash
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

### Step 5 — Switch back to mainnet
Change `.env.local`:
```bash
NEXT_PUBLIC_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
```
*No code changes needed. Just the environment variable update.*
