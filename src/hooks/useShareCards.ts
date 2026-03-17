'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "./useConvexUser";

export function useShareCards() {
  const { convexUser } = useConvexUser();
  const userCards = useQuery(api.shareCards.getUserShareCards, convexUser ? { userId: convexUser._id } : "skip");
  
  const createShareCard = useMutation(api.shareCards.createShareCard);

  return {
    userCards: userCards ?? [],
    createShareCard: (type: string, data: any) => 
      convexUser && createShareCard({ userId: convexUser._id, type, data }),
  };
}
