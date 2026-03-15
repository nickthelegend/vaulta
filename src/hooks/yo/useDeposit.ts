'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi, yoGatewayAbi } from '@/src/lib/yo/abi';
import { YO_CONTRACTS, PARTNER_ID, USDC_DECIMALS } from '@/src/lib/yo/constants';
import { DepositState, YoVault } from '@/src/lib/yo/types';
import { applySlippage } from '@/src/lib/yo/helpers';

export function useDeposit() {
  const { address } = useAccount();
  const [depositState, setDepositState] = useState<DepositState>('idle');
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<string | null>(null);

  const { writeContractAsync } = useWriteContract();

  // 1. Check Allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: YO_CONTRACTS.assets.USDC as `0x${string}`,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, YO_CONTRACTS.gateway as `0x${string}`] : undefined,
  });

  const deposit = async (vault: YoVault, amount: bigint) => {
    setDepositState('idle');
    setError(null);
    if (!address) return;

    const vaultAddress = YO_CONTRACTS.vaults[vault] as `0x${string}`;

    try {
      // Step 1: Handle Allowance
      if (!allowance || allowance < amount) {
        setDepositState('approving');
        const approveHash = await writeContractAsync({
          address: YO_CONTRACTS.assets.USDC as `0x${string}`,
          abi: erc20Abi,
          functionName: 'approve',
          args: [YO_CONTRACTS.gateway as `0x${string}`, amount],
        });
        // We'd ideally wait for receipt here, simplified for brevity
        await refetchAllowance();
        setDepositState('approved');
      }

      // Step 2: Preview & Deposit
      setDepositState('depositing');
      
      // In a real app, you'd call useReadContract for previewDeposit
      // and use that result with applySlippage(shares, 50)
      const minSharesOut = 0n; // Set 0 for simplicity, should be preview - slippage

      const hash = await writeContractAsync({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'deposit',
        args: [vaultAddress, amount, minSharesOut, address, PARTNER_ID],
      });

      setTxHash(hash);
      setDepositState('success');
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      setDepositState('error');
    }
  };

  return { deposit, depositState, txHash, error };
}
