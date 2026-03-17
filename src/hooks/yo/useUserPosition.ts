'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useYoBalance } from './useYoBalance';
import { yoApi } from '@/src/lib/yo/api';
import { YO_CONTRACTS } from '@/src/lib/yo/constants';
import { UserPosition } from '@/src/lib/yo/types';

export function useUserPosition() {
  const { address } = useAccount();

  // Get balances for all 3 vaults
  const yoUSD = useYoBalance(YO_CONTRACTS.vaults.yoUSD as `0x${string}`, address);
  const yoETH = useYoBalance(YO_CONTRACTS.vaults.yoETH as `0x${string}`, address);
  const yoBTC = useYoBalance(YO_CONTRACTS.vaults.yoBTC as `0x${string}`, address);

  const [history, setHistory] = useState<{ deposits: any[]; withdrawals: any[] } | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!address) return;
    setIsHistoryLoading(true);
    try {
      const data = await yoApi.getUserHistory(YO_CONTRACTS.vaults.yoUSD, address);
      setHistory(data);
    } catch (e) {
      console.error('History fetch error:', e);
    } finally {
      setIsHistoryLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const totalValueUSD = yoUSD.assetValueUSD + yoETH.assetValueUSD + yoBTC.assetValueUSD;

  const vaults: UserPosition[] = [
    { vault: 'yoUSD', yoTokenBalance: yoUSD.yoTokenBalance, assetValue: yoUSD.assetValueUSD, yieldEarned: 0, apy: 0 },
    { vault: 'yoETH', yoTokenBalance: yoETH.yoTokenBalance, assetValue: yoETH.assetValueUSD, yieldEarned: 0, apy: 0 },
    { vault: 'yoBTC', yoTokenBalance: yoBTC.yoTokenBalance, assetValue: yoBTC.assetValueUSD, yieldEarned: 0, apy: 0 },
  ];

  const refetch = useCallback(async () => {
    // In wagmi hooks, refetching happens automatically if dependencies change or we call refetch on the hook result.
    // Our useYoBalance returns its own internal data, but useUserPosition doesn't expose its refetches.
    await fetchHistory();
  }, [fetchHistory]);

  return {
    totalValueUSD,
    vaults,
    totalYieldEarned: 0,
    isLoading: yoUSD.isLoading || yoETH.isLoading || yoBTC.isLoading || isHistoryLoading,
    refetch
  };
}
