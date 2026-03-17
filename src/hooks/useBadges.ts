'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "./useConvexUser";

export function useBadges() {
  const { convexUser } = useConvexUser();
  const badges = useQuery(api.badges.getUserBadges, convexUser ? { userId: convexUser._id } : "skip");
  
  const checkAndAward = useMutation(api.badges.checkAndAwardBadges);
  const markShared = useMutation(api.badges.markBadgeShared);

  return {
    badges: badges ?? [],
    checkAndAward: () => convexUser && checkAndAward({ userId: convexUser._id }),
    markShared: (badgeId: any) => markShared({ badgeId }),
  };
}
