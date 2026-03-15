## Connect MetaMask to Local Fork

1. Open MetaMask → Networks → Add Network → Add manually:
   - Network Name: VAULTA Local Fork
   - RPC URL: http://localhost:8545
   - Chain ID: 8453
   - Currency: ETH

2. Import test wallet using private key:
   - Account 0 private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

3. You now have 10,000 ETH + 10,000 USDC on the local fork

## Switch Back To Mainnet

Just switch MetaMask network to "Base Mainnet".
No code changes needed — app reads from `NEXT_PUBLIC_RPC_URL`.
