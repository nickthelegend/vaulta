'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, usePublicClient } from 'wagmi';
import { erc20Abi, yoGatewayAbi } from '@/src/lib/yo/abi';
import { YO_CONTRACTS, PARTNER_ID, USDC_DECIMALS } from '@/src/lib/yo/constants';
import { DepositState, YoVault } from '@/src/lib/yo/types';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexUser } from '../useConvexUser';
import { formatUnits } from 'viem';

export function useDeposit() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [depositState, setDepositState] = useState<DepositState>('idle');
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<string | null>(null);

  const { convexUser } = useConvexUser();
  const recordDepositMutation = useMutation(api.streaks.recordDeposit);
  const checkBadges = useMutation(api.badges.checkAndAwardBadges);
  const createNotification = useMutation(api.notifications.createNotification);
  const updateLeaderboard = useMutation(api.leaderboard.updateLeaderboard);
  const updateGoalProgress = useMutation(api.goals.updateGoalProgress);

  const { writeContractAsync } = useWriteContract();

  // 1. Check Allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: YO_CONTRACTS.assets.USDC as `0x${string}`,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, YO_CONTRACTS.gateway as `0x${string}`] : undefined,
  });

  const deposit = async (vault: YoVault, amount: bigint, goals?: any[], totalValueUSD?: number) => {
    setDepositState('idle');
    setError(null);
    if (!address || !convexUser) return;

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
        if (publicClient) {
          await publicClient.waitForTransactionReceipt({ hash: approveHash });
        }
        await refetchAllowance();
        setDepositState('approved');
      }

      // Step 2: Deposit
      setDepositState('depositing');
      const minSharesOut = BigInt(0);

      const hash = await writeContractAsync({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'deposit',
        args: [vaultAddress, amount, minSharesOut, address, PARTNER_ID],
      });

      setTxHash(hash);

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      // Step 3: Optimistic Sync with Convex
      const amountNum = parseFloat(formatUnits(amount, USDC_DECIMALS));
      const newTotal = (totalValueUSD || 0) + amountNum;

      await recordDepositMutation({ userId: convexUser._id });
      const newBadges = await checkBadges({ userId: convexUser._id });

      // Update active goals
      if (goals) {
        const activeGoals = goals.filter(g => g.status === 'active');
        for (const goal of activeGoals) {
          await updateGoalProgress({ goalId: goal._id, currentAmount: newTotal });
        }
      }

      await updateLeaderboard({
        userId: convexUser._id,
        totalSaved: newTotal,
        totalYieldEarned: 0,
        currentStreak: 0,
        savingsScore: 0
      });

      await createNotification({
        userId: convexUser._id,
        type: 'deposit',
        title: 'Deposit Successful',
        message: `$${amountNum.toFixed(2)} deposited into ${vault}`
      });

      setDepositState('success');
      return { hash, newBadges };
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      setDepositState('error');
      throw e;
    }
  };

  return { deposit, depositState, txHash, error };
}
