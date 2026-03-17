'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "./useConvexUser";
import { useEffect } from "react";
import { FC_SESSION_KEY } from "../lib/constants";

export function useStreaks() {
  const { convexUser } = useConvexUser();
  const streakData = useQuery(api.streaks.getStreak, convexUser ? { userId: convexUser._id } : "skip");
  const isAtRisk = useQuery(api.streaks.checkStreakAtRisk, convexUser ? { userId: convexUser._id } : "skip");
  const badgesEarned = useQuery(api.badges.getUserBadges, convexUser ? { userId: convexUser._id } : "skip");
  
  const recordDepositMutation = useMutation(api.streaks.recordDeposit);
  const awardBadgesMutation = useMutation(api.badges.checkAndAwardBadges);

  const recordDeposit = async () => {
    if (!convexUser) return { newBadges: [] };
    await recordDepositMutation({ userId: convexUser._id });
    const newBadges = await awardBadgesMutation({ userId: convexUser._id });
    return { newBadges };
  };

  return {
    currentStreak: streakData?.currentStreak ?? 0,
    longestStreak: streakData?.longestStreak ?? 0,
    weeklyHistory: streakData?.weeklyHistory ?? [],
    lastDepositDate: streakData?.lastDepositDate,
    totalDeposits: streakData?.totalDeposits ?? 0,
    isAtRisk: !!isAtRisk,
    badgesEarned: badgesEarned ?? [],
    recordDeposit,
    isStale: streakData === undefined && !!convexUser
  };
}
