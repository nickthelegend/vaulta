/*
  VAULTA WORKING EXAMPLES
  -----------------------

  // 1. Reading USDC balance on Base
  const { data: usdcBalance } = useReadContract({ 
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', 
    abi: erc20Abi, 
    functionName: 'balanceOf', 
    args: [address], 
    chainId: 8453 
  })

  // 2. Writing a contract
  const { writeContract } = useWriteContract()

  // 3. Switching chain
  const { switchChain } = useSwitchChain()
  switchChain({ chainId: 8453 })

  // 4. Farcaster sign in
  const { signIn, data: fcData, isSuccess } = useSignIn({ 
    onSuccess: ({ fid, username, displayName, pfpUrl }) => { 
      // store in localStorage or handled by AuthKit
    } 
  })
*/

export const examples = {};
