'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useVaultaAuth } from "./useVaultaAuth";
import { useEffect, useState } from "react";
import { FC_SESSION_KEY } from "../lib/constants";

export function useConvexUser() {
  const { address, farcasterUser, isFarcasterConnected, disconnect } = useVaultaAuth();
  const getOrCreate = useMutation(api.users.getOrCreateUser);

  const user = useQuery(api.users.getUser, address ? { address } : "skip");
  const [isLoading, setIsLoading] = useState(true);

  // Silently clear expired or mismatched Farcaster sessions
  useEffect(() => {
    if (isFarcasterConnected && farcasterUser && farcasterUser.fid !== undefined && typeof window !== 'undefined') {
      const storedFid = localStorage.getItem('vaulta_fc_fid');
      if (storedFid && parseInt(storedFid) !== farcasterUser.fid) {
        // Mismatch - clear session
        localStorage.removeItem(FC_SESSION_KEY);
        localStorage.removeItem('vaulta_fc_fid');
        disconnect();
      } else {
        localStorage.setItem('vaulta_fc_fid', farcasterUser.fid.toString());
      }
    }
  }, [farcasterUser, isFarcasterConnected, disconnect]);

  useEffect(() => {
    async function sync() {
      if (address) {
        setIsLoading(true);
        try {
          const farcasterData = (farcasterUser && farcasterUser.fid !== undefined) ? {
            fid: farcasterUser.fid,
            username: farcasterUser.username!,
            avatar: farcasterUser.pfpUrl!,
            displayName: farcasterUser.displayName!,
          } : undefined;

          await getOrCreate({ address, farcasterData });
        } catch (e) {
          console.error("Failed to sync Convex user:", e);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    sync();
  }, [address, farcasterUser, getOrCreate]);

  return {
    convexUser: user,
    isLoading: isLoading || (!!address && user === undefined),
    isOffline: user === undefined && !!address // Simple offline check
  };
}
