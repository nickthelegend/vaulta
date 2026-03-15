#!/bin/bash
# USDC contract on Base
USDC="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
# Known USDC whale on Base
WHALE="0x20FE51A9229EEf2cF8Ad9E89d91CAb9312cF3b7A"

# Test wallets to fund
WALLET_0="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
WALLET_1="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
WALLET_2="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"

RPC="http://localhost:8545"
# Amount: 10,000 USDC (6 decimals)
AMOUNT="10000000000"

echo "💰 Funding test wallets with USDC..."
cast rpc anvil_impersonateAccount $WHALE --rpc-url $RPC
cast send $USDC "transfer(address,uint256)" $WALLET_0 $AMOUNT --from $WHALE --rpc-url $RPC --unlocked
cast send $USDC "transfer(address,uint256)" $WALLET_1 $AMOUNT --from $WHALE --rpc-url $RPC --unlocked
cast send $USDC "transfer(address,uint256)" $WALLET_2 $AMOUNT --from $WHALE --rpc-url $RPC --unlocked
cast rpc anvil_stopImpersonatingAccount $WHALE --rpc-url $RPC

echo "✅ Done. Verify balances:"
cast call $USDC "balanceOf(address)(uint256)" $WALLET_0 --rpc-url $RPC
cast call $USDC "balanceOf(address)(uint256)" $WALLET_1 --rpc-url $RPC
cast call $USDC "balanceOf(address)(uint256)" $WALLET_2 --rpc-url $RPC
