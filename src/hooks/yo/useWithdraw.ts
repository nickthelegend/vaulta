'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { yoGatewayAbi } from '@/src/lib/yo/abi';
import { YO_CONTRACTS, USDC_DECIMALS } from '@/src/lib/yo/constants';
import { YoVault } from '@/src/lib/yo/types';
import { formatUnits } from 'viem';
import { yoApi } from '@/src/lib/yo/api';

export function useWithdraw() {
  const { address } = useAccount();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContractAsync } = useWriteContract();

  const withdraw = async (vault: YoVault, shares: bigint) => {
    setIsWithdrawing(true);
    setError(null);
    if (!address) return;

    const vaultAddress = YO_CONTRACTS.vaults[vault] as `0x${string}`;

    try {
      // 1. Check pending redeems from API
      const pending = await yoApi.getPendingRedeems(vaultAddress);
      
      // 2. Execute redeem
      const minAssetsOut = 0n; // Simplified, should be previewRedeem - 0.5% slippage

      const hash = await writeContractAsync({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'redeem',
        args: [vaultAddress, shares, minAssetsOut, address],
      });

      return hash;
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return { withdraw, isWithdrawing, error };
}
