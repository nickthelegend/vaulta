'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useYieldCache() {
  const upsert = useMutation(api.yieldCache.upsertYieldCache);
  const appendHistory = useMutation(api.yieldCache.appendYieldHistory);

  return {
    upsertCache: upsert,
    appendHistory,
    getYieldCache: (vaultAddress: string) => useQuery(api.yieldCache.getYieldCache, { vaultAddress }),
    getYieldHistory: (vaultAddress: string, days: number) => useQuery(api.yieldCache.getYieldHistory, { vaultAddress, days }),
  };
}
