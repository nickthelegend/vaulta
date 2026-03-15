#!/bin/bash
WETH="0x4200000000000000000000000000000000000006"
WALLET_0="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
RPC="http://localhost:8545"

echo "💎 Wrapping ETH to WETH for test wallet..."
# Deposit ETH to get WETH (10 WETH)
cast send $WETH "deposit()" \
  --value 10ether \
  --from $WALLET_0 \
  --rpc-url $RPC \
  --unlocked

echo "✅ Wallet 0 now has 10 WETH"
cast call $WETH "balanceOf(address)(uint256)" $WALLET_0 --rpc-url $RPC
