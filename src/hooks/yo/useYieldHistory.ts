'use client';

import { useState, useEffect } from 'react';
import { yoApi } from '@/src/lib/yo/api';
import { YieldDataPoint } from '@/src/lib/yo/types';

export function useYieldHistory(vaultAddress: string, days: 30 | 90 | 180 = 30) {
  const [data, setData] = useState<YieldDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      setIsLoading(true);
      try {
        const history = await yoApi.getYieldTimeseries(vaultAddress, days);
        setData(history);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, [vaultAddress, days]);

  return { data, isLoading };
}
