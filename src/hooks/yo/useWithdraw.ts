'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, usePublicClient } from 'wagmi';
import { yoGatewayAbi } from '@/src/lib/yo/abi';
import { YO_CONTRACTS } from '@/src/lib/yo/constants';
import { YoVault } from '@/src/lib/yo/types';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexUser } from '../useConvexUser';

export function useWithdraw() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { convexUser } = useConvexUser();
  const updateLeaderboard = useMutation(api.leaderboard.updateLeaderboard);
  const createNotification = useMutation(api.notifications.createNotification);

  const { writeContractAsync } = useWriteContract();

  const withdraw = async (vault: YoVault, shares: bigint, totalValueUSD?: number) => {
    setIsWithdrawing(true);
    setError(null);
    if (!address || !convexUser) return;

    const vaultAddress = YO_CONTRACTS.vaults[vault] as `0x${string}`;

    try {
      const minAssetsOut = BigInt(0);

      const hash = await writeContractAsync({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'redeem',
        args: [vaultAddress, shares, minAssetsOut, address],
      });

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      // Step 3: Sync Convex totals
      // This is a rough update, the next refresh will fix it exactly
      await updateLeaderboard({
        userId: convexUser._id,
        totalSaved: (totalValueUSD || 0), // Simplified, ideally deduct exact amount
        totalYieldEarned: 0,
        currentStreak: 0,
        savingsScore: 0
      });

      await createNotification({
        userId: convexUser._id,
        type: 'withdraw',
        title: 'Withdrawal Successful',
        message: `Processed emergency withdrawal from ${vault}`
      });

      return hash;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setIsWithdrawing(false);
    }
  };

  return { withdraw, isWithdrawing, error };
}
