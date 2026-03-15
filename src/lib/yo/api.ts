import { VaultData, YieldDataPoint } from './types';

const YO_API = 'https://api.yo.xyz';

async function fetcher<T>(path: string): Promise<T> {
  const response = await fetch(`${YO_API}${path}`);
  if (!response.ok) {
    throw new Error(`YO API Error: ${response.statusText}`);
  }
  return response.json();
}

export const yoApi = {
  async getVault(vaultAddress: string): Promise<VaultData> {
    return fetcher<VaultData>(`/api/v1/vault/base/${vaultAddress}`);
  },

  async getYieldTimeseries(vaultAddress: string, days: 30 | 90 | 180): Promise<YieldDataPoint[]> {
    return fetcher<YieldDataPoint[]>(`/api/v1/vault/yield/timeseries/base/${vaultAddress}?days=${days}`);
  },

  async getTVLTimeseries(vaultAddress: string, days: number): Promise<{timestamp: number, tvl: number}[]> {
    return fetcher<{timestamp: number, tvl: number}[]>(`/api/v1/vault/tvl/timeseries/base/${vaultAddress}?days=${days}`);
  },

  async getUserHistory(vaultAddress: string, userAddress: string): Promise<{deposits: any[], withdrawals: any[]}> {
    return fetcher<{deposits: any[], withdrawals: any[]}>(`/api/v1/history/user/base/${vaultAddress}/${userAddress}`);
  },

  async getPendingRedeems(vaultAddress: string): Promise<{pendingAmount: number, estimatedWaitMinutes: number}> {
    return fetcher<{pendingAmount: number, estimatedWaitMinutes: number}>(`/api/v1/vault/pending-redeems/base/${vaultAddress}`);
  }
};
