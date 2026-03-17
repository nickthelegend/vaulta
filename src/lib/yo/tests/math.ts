import { mathUtils } from '../helpers';

export const mathTests = [
  {
    id: '10.1',
    name: 'calculateYieldEarned',
    group: 'Math',
    run: async () => {
      const result = mathUtils.calculateYieldEarned(100000000n, 108600000n);
      if (result === 8600000n) return { status: 'PASS', value: 'calculateYieldEarned: 8.60 USDC ✓' };
      throw new Error(`Expected 8600000, got ${result.toString()}`);
    }
  },
  {
    id: '10.2',
    name: 'projectFutureValue',
    group: 'Math',
    run: async () => {
      const result = mathUtils.projectFutureValue(1000, 100, 8.6, 12);
      if (result > 2300 && result < 2400) return { status: 'PASS', value: `projectFutureValue: $${result.toFixed(2)} in 12 months ✓` };
      throw new Error(`Expected ~2327, got ${result}`);
    }
  },
  {
    id: '10.3',
    name: 'monthsToGoal',
    group: 'Math',
    run: async () => {
      const result = mathUtils.monthsToGoal(500, 100, 2000, 8.6);
      if (result >= 13 && result <= 15) return { status: 'PASS', value: `monthsToGoal: ~${result} months ✓` };
      throw new Error(`Expected ~14, got ${result}`);
    }
  },
  {
    id: '10.4',
    name: 'formatUSDC',
    group: 'Math',
    run: async () => {
      const result = mathUtils.formatUSDC(1247830000n);
      if (result === '$1,247.83') return { status: 'PASS', value: 'formatUSDC: $1,247.83 ✓' };
      throw new Error(`Expected $1,247.83, got ${result}`);
    }
  },
  {
    id: '10.5',
    name: 'parseUSDC',
    group: 'Math',
    run: async () => {
      const result = mathUtils.parseUSDC('1247.83');
      if (result === 1247830000n) return { status: 'PASS', value: 'parseUSDC: 1247830000n ✓' };
      throw new Error(`Expected 1247830000n, got ${result.toString()}n`);
    }
  },
  {
    id: '10.6',
    name: 'applySlippage',
    group: 'Math',
    run: async () => {
      const result = mathUtils.applySlippage(1000000000n, 50);
      if (result === 995000000n) return { status: 'PASS', value: 'applySlippage 0.5%: 995000000n ✓' };
      throw new Error(`Expected 995000000n, got ${result.toString()}n`);
    }
  }
];
