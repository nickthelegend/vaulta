'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "./useConvexUser";

export function useLeaderboard() {
  const { convexUser } = useConvexUser();
  const topSavers = useQuery(api.leaderboard.getTopSavers, { limit: 10 });
  const userRank = useQuery(api.leaderboard.getUserRank, convexUser ? { userId: convexUser._id } : "skip");
  
  const updateLeaderboard = useMutation(api.leaderboard.updateLeaderboard);

  return {
    topSavers: topSavers ?? [],
    userRank: userRank ?? null,
    updateLeaderboard: (data: { totalSaved: number; totalYieldEarned: number; currentStreak: number; savingsScore: number }) => 
      convexUser && updateLeaderboard({ userId: convexUser._id, ...data }),
  };
}
