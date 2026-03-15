'use client';

import { useState, useEffect } from 'react';
import { yoApi } from '@/src/lib/yo/api';
import { VaultData } from '@/src/lib/yo/types';

export function useVaultData(vaultAddress: string) {
  const [data, setData] = useState<VaultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const vaultData = await yoApi.getVault(vaultAddress);
        setData(vaultData);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [vaultAddress]);

  return { ...data, isLoading, error };
}
