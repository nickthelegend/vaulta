'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useYoBalance } from './useYoBalance';
import { yoApi } from '@/src/lib/yo/api';
import { YO_CONTRACTS } from '@/src/lib/yo/constants';
import { UserPosition, YoVault } from '@/src/lib/yo/types';

export function useUserPosition() {
  const { address } = useAccount();

  // Get balances for all 3 vaults
  const yoUSD = useYoBalance(YO_CONTRACTS.vaults.yoUSD as `0x${string}`, address);
  const yoETH = useYoBalance(YO_CONTRACTS.vaults.yoETH as `0x${string}`, address);
  const yoBTC = useYoBalance(YO_CONTRACTS.vaults.yoBTC as `0x${string}`, address);

  const [history, setHistory] = useState<{ deposits: any[]; withdrawals: any[] } | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    async function fetchHistory() {
      setIsHistoryLoading(true);
      try {
        // Fetching history for yoUSD as an example/aggregator
        const data = await yoApi.getUserHistory(YO_CONTRACTS.vaults.yoUSD, address);
        setHistory(data);
      } catch (e) {
        console.error('History fetch error:', e);
      } finally {
        setIsHistoryLoading(false);
      }
    }
    fetchHistory();
  }, [address]);

  const totalValueUSD = yoUSD.assetValueUSD + yoETH.assetValueUSD + yoBTC.assetValueUSD;

  const vaults: UserPosition[] = [
    { vault: 'yoUSD', ...yoUSD, yieldEarned: 0, apy: 0 }, // Yield/APY to be populated from API
    { vault: 'yoETH', ...yoETH, yieldEarned: 0, apy: 0 },
    { vault: 'yoBTC', ...yoBTC, yieldEarned: 0, apy: 0 },
  ];

  return {
    totalValueUSD,
    vaults,
    totalYieldEarned: 0, // Calculated from history vs current value
    isLoading: yoUSD.isLoading || yoETH.isLoading || yoBTC.isLoading || isHistoryLoading,
  };
}
