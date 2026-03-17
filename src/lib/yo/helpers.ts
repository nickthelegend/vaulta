import { formatUnits, parseUnits } from 'viem';

export const mathUtils = {
  calculateYieldEarned: (depositAmount: bigint, currentValue: bigint): bigint => {
    return currentValue - depositAmount;
  },

  projectFutureValue: (currentBalance: number, monthlyDeposit: number, apy: number, months: number): number => {
    const monthlyRate = (apy / 100) / 12;
    let total = currentBalance;
    for (let i = 0; i < months; i++) {
      total = (total + monthlyDeposit) * (1 + monthlyRate);
    }
    return total;
  },

  monthsToGoal: (currentBalance: number, monthlyDeposit: number, target: number, apy: number): number => {
    const monthlyRate = (apy / 100) / 12;
    let total = currentBalance;
    let months = 0;
    if (total >= target) return 0;
    while (total < target && months < 1200) { // Cap at 100 years
      total = (total + monthlyDeposit) * (1 + monthlyRate);
      months++;
    }
    return months;
  },

  formatUSDC: (amount: bigint): string => {
    const formatted = formatUnits(amount, 6);
    return `$${parseFloat(formatted).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  parseUSDC: (amount: string): bigint => {
    return parseUnits(amount, 6);
  },

  applySlippage: (amount: bigint, bps: number): bigint => {
    return (amount * BigInt(10000 - bps)) / BigInt(10000);
  }
};
