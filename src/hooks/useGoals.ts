'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "./useConvexUser";
import { useUserPosition } from "./yo/useUserPosition";
import { useEffect, useCallback } from "react";

export function useGoals() {
  const { convexUser } = useConvexUser();
  const { totalValueUSD } = useUserPosition();
  
  const goals = useQuery(api.goals.getUserGoals, convexUser ? { userId: convexUser._id } : "skip");
  
  const createGoalMutation = useMutation(api.goals.createGoal);
  const updateProgressMutation = useMutation(api.goals.updateGoalProgress);
  const completeGoalMutation = useMutation(api.goals.completeGoal);

  const syncProgress = useCallback(async () => {
    if (convexUser && goals) {
      const activeGoals = goals.filter(g => g.status === 'active');
      for (const goal of activeGoals) {
          // If we're updating progress, we should check for completion too
          const newAmount = totalValueUSD;
          await updateProgressMutation({ goalId: goal._id, currentAmount: newAmount });
          
          if (newAmount >= goal.targetAmount && goal.status !== 'completed') {
              await completeGoalMutation({ goalId: goal._id });
          }
      }
    }
  }, [convexUser, goals, totalValueUSD, updateProgressMutation, completeGoalMutation]);

  // Auto-sync progress for active goals when position changes
  useEffect(() => {
    syncProgress();
  }, [totalValueUSD, syncProgress]);

  const createGoal = async (name: string, emoji: string, targetAmount: number, targetDate: number, vault: string) => {
    if (!convexUser) return;
    return await createGoalMutation({
      userId: convexUser._id,
      name,
      emoji,
      targetAmount,
      targetDate,
      vault,
    });
  };

  return {
    goals: goals ?? [],
    createGoal,
    syncProgress,
    completeGoal: (goalId: any) => completeGoalMutation({ goalId }),
    isLoading: goals === undefined,
  };
}
