import { formatUnits, parseUnits } from 'viem';
import { USDC_DECIMALS, YO_TOKEN_DECIMALS } from './constants';

export function calculateYieldEarned(depositAmount: bigint, currentValue: bigint): bigint {
  return currentValue > depositAmount ? currentValue - depositAmount : 0n;
}

export function projectFutureValue(
  currentBalance: number,
  monthlyDeposit: number,
  apy: number,
  months: number
): number {
  const monthlyRate = apy / 12;
  let total = currentBalance;
  for (let i = 0; i < months; i++) {
    total = (total + monthlyDeposit) * (1 + monthlyRate);
  }
  return total;
}

export function monthsToGoal(
  currentBalance: number,
  monthlyDeposit: number,
  targetAmount: number,
  apy: number
): number {
  if (currentBalance >= targetAmount) return 0;
  const monthlyRate = apy / 12;
  if (monthlyDeposit <= 0 && apy <= 0) return Infinity;
  
  // Basic iterative approach for compound interest + monthly deposits
  let months = 0;
  let total = currentBalance;
  while (total < targetAmount && months < 1200) { // Cap at 100 years
    total = (total + monthlyDeposit) * (1 + monthlyRate);
    months++;
  }
  return months;
}

export function yoTokensToAssets(yoTokenAmount: bigint, pricePerShare: bigint): number {
  // assets = (shares * pricePerShare) / 10^shares_decimals
  const assets = (yoTokenAmount * pricePerShare) / parseUnits('1', YO_TOKEN_DECIMALS);
  return parseFloat(formatUnits(assets, USDC_DECIMALS));
}

export function applySlippage(amount: bigint, slippageBps: number): bigint {
  // slippageBps = 50 means 0.5% slippage
  // returns amount * (10000 - slippageBps) / 10000
  return (amount * BigInt(10000 - slippageBps)) / 10000n;
}

export function formatUSDC(amount: bigint): string {
  const value = parseFloat(formatUnits(amount, USDC_DECIMALS));
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function parseUSDC(amount: string): bigint {
  const cleanAmount = amount.replace(/[^0-9.]/g, '');
  return parseUnits(cleanAmount, USDC_DECIMALS);
}
