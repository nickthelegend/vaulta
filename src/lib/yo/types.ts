export type YoVault = 'yoUSD' | 'yoETH' | 'yoBTC';

export type VaultData = {
  apy: number;
  tvl: number;
  allocations: {
    protocol: string;
    percentage: number;
    apy: number;
    riskRating: string;
  }[];
};

export type UserPosition = {
  vault: YoVault;
  yoTokenBalance: bigint;
  assetValue: number;
  yieldEarned: number;
  apy: number;
};

export type YieldDataPoint = {
  timestamp: number;
  apy: number;
};

export type DepositState = 
  | 'idle' 
  | 'approving' 
  | 'approved' 
  | 'depositing' 
  | 'success' 
  | 'error';
