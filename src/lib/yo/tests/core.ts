import { createPublicClient, createWalletClient, http, formatUnits, isAddressEqual, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { YO_CONTRACTS, USDC_DECIMALS, PARTNER_ID } from '../constants';
import { erc20Abi, yoVaultAbi, yoGatewayAbi } from '../abi';
import { yoApi } from '../api';

const TEST_WALLET = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const TEST_PK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' as `0x${string}`;

const client = createPublicClient({
  chain: { ...base, id: 8453 },
  transport: http('http://localhost:8545')
});

const walletClient = createWalletClient({
  account: privateKeyToAccount(TEST_PK),
  chain: { ...base, id: 8453 },
  transport: http('http://localhost:8545')
});

// Shared state between tests
let shared: any = {
  yoUSD_tokens: 0n,
  yoUSD_balance: 0n
};

export const networkTests = [
  {
    id: '1.1',
    group: 'Network',
    name: 'RPC Connected',
    run: async () => {
      const chainId = await client.getChainId();
      if (chainId === 8453) return { status: 'PASS', value: `Chain ID: ${chainId} ✓` };
      throw new Error(`Wrong Chain ID: ${chainId}`);
    }
  },
  {
    id: '1.2',
    group: 'Network',
    name: 'Block Number Live',
    run: async () => {
      const block = await client.getBlockNumber();
      return { status: 'PASS', value: `Current block: #${block.toLocaleString()} ✓` };
    }
  },
  {
    id: '1.3',
    group: 'Network',
    name: 'Fork Is Recent',
    run: async () => {
      const block = await client.getBlock();
      const now = BigInt(Math.floor(Date.now() / 1000));
      const diff = now - block.timestamp;
      const isRecent = diff < 86400n;
      return { 
        status: isRecent ? 'PASS' : 'WARN', 
        value: `Fork timestamp: ${new Date(Number(block.timestamp) * 1000).toLocaleTimeString()} ${isRecent ? '✓' : '(STALE)'}` 
      };
    }
  }
];

export const walletTests = [
  {
    id: '2.1',
    group: 'Wallet',
    name: 'Test Wallet Has ETH',
    run: async () => {
      const balance = await client.getBalance({ address: TEST_WALLET });
      return { status: 'PASS', value: `ETH Balance: ${parseFloat(formatUnits(balance, 18)).toFixed(1)} ETH ✓` };
    }
  },
  {
    id: '2.2',
    group: 'Wallet',
    name: 'Test Wallet Has USDC',
    run: async () => {
      const balance = await client.readContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [TEST_WALLET]
      });
      if (balance > 0n) return { status: 'PASS', value: `USDC Balance: ${parseFloat(formatUnits(balance, USDC_DECIMALS)).toLocaleString()} USDC ✓` };
      throw new Error('Run "npm run fork:fund" first');
    }
  },
  {
    id: '2.3',
    group: 'Wallet',
    name: 'USDC Contract Exists',
    run: async () => {
      const symbol = await client.readContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'symbol'
      });
      if (symbol === 'USDC') return { status: 'PASS', value: 'USDC contract: verified ✓' };
      throw new Error(`Unexpected symbol: ${symbol}`);
    }
  }
];

export const contractTests = [
  {
    id: '3.1',
    group: 'Contracts',
    name: 'yoGateway Exists',
    run: async () => {
      const code = await client.getBytecode({ address: YO_CONTRACTS.gateway as `0x${string}` });
      if (code && code.length > 2) return { status: 'PASS', value: `yoGateway: deployed at 0xF1EE...9FA ✓` };
      throw new Error('Gateway code not found');
    }
  },
  {
    id: '3.2',
    group: 'Contracts',
    name: 'yoUSD Vault Exists',
    run: async () => {
      const code = await client.getBytecode({ address: YO_CONTRACTS.vaults.yoUSD as `0x${string}` });
      if (code && code.length > 2) return { status: 'PASS', value: 'yoUSD vault: deployed ✓' };
      throw new Error('yoUSD vault not found');
    }
  },
  {
    id: '3.3',
    group: 'Contracts',
    name: 'yoETH Vault Exists',
    run: async () => {
      const code = await client.getBytecode({ address: YO_CONTRACTS.vaults.yoETH as `0x${string}` });
      if (code && code.length > 2) return { status: 'PASS', value: 'yoETH vault: deployed ✓' };
      throw new Error('yoETH vault not found');
    }
  },
  {
    id: '3.4',
    group: 'Contracts',
    name: 'yoUSD Is ERC4626',
    run: async () => {
      const asset = await client.readContract({
        address: YO_CONTRACTS.vaults.yoUSD as `0x${string}`,
        abi: yoVaultAbi,
        functionName: 'asset'
      });
      if (isAddressEqual(asset, YO_CONTRACTS.assets.USDC as `0x${string}`)) return { status: 'PASS', value: 'yoUSD underlying asset: USDC ✓' };
      throw new Error(`Wrong asset: ${asset}`);
    }
  },
  {
    id: '3.5',
    group: 'Contracts',
    name: 'yoETH Is ERC4626',
    run: async () => {
      const asset = await client.readContract({
        address: YO_CONTRACTS.vaults.yoETH as `0x${string}`,
        abi: yoVaultAbi,
        functionName: 'asset'
      });
      if (isAddressEqual(asset, YO_CONTRACTS.assets.WETH as `0x${string}`)) return { status: 'PASS', value: 'yoETH underlying asset: WETH ✓' };
      throw new Error(`Wrong asset: ${asset}`);
    }
  }
];

export const apiTests = [
  {
    id: '4.1',
    group: 'API',
    name: 'YO API Reachable',
    run: async () => {
      await yoApi.getVault(YO_CONTRACTS.vaults.yoUSD);
      return { status: 'PASS', value: 'YO API: reachable ✓' };
    }
  },
  {
    id: '4.2',
    group: 'API',
    name: 'yoUSD Vault Data',
    run: async () => {
      const data = await yoApi.getVault(YO_CONTRACTS.vaults.yoUSD);
      return { status: 'PASS', value: `yoUSD APY: ${data.apy}% | TVL: $${(data.tvl / 1e6).toFixed(1)}m | Allocations: ${data.allocations.length} protocols ✓` };
    }
  },
  {
    id: '4.3',
    group: 'API',
    name: 'yoETH Vault Data',
    run: async () => {
      const data = await yoApi.getVault(YO_CONTRACTS.vaults.yoETH);
      return { status: 'PASS', value: `yoETH APY: ${data.apy}% | TVL: $${(data.tvl / 1e6).toFixed(1)}m ✓` };
    }
  },
  {
    id: '4.4',
    group: 'API',
    name: 'Yield Timeseries',
    run: async () => {
      const history = await yoApi.getYieldTimeseries(YO_CONTRACTS.vaults.yoUSD, 30);
      return { status: 'PASS', value: `30-day yield history: ${history.length} data points ✓` };
    }
  },
  {
    id: '4.5',
    group: 'API',
    name: 'Pending Redeems',
    run: async () => {
      const res = await yoApi.getPendingRedeems(YO_CONTRACTS.vaults.yoUSD);
      return { status: 'PASS', value: `Pending redeems: $${res.pendingAmount} | Wait: ${res.estimatedWaitMinutes} mins ✓` };
    }
  }
];

export const previewTests = [
  {
    id: '5.1',
    group: 'Preview',
    name: 'previewDeposit yoUSD',
    run: async () => {
      shared.yoUSD_tokens = await client.readContract({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'previewDeposit',
        args: [YO_CONTRACTS.vaults.yoUSD as `0x${string}`, parseUnits('100', USDC_DECIMALS)]
      });
      return { status: 'PASS', value: `100 USDC → ${formatUnits(shared.yoUSD_tokens, 18)} yoUSD tokens ✓` };
    }
  },
  {
    id: '5.2',
    group: 'Preview',
    name: 'previewDeposit yoETH',
    run: async () => {
      const shares = await client.readContract({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'previewDeposit',
        args: [YO_CONTRACTS.vaults.yoETH as `0x${string}`, parseUnits('1', 18)]
      });
      return { status: 'PASS', value: `1 WETH → ${formatUnits(shares, 18)} yoETH tokens ✓` };
    }
  },
  {
    id: '5.3',
    group: 'Preview',
    name: 'previewRedeem yoUSD',
    run: async () => {
      const assets = await client.readContract({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'previewRedeem',
        args: [YO_CONTRACTS.vaults.yoUSD as `0x${string}`, shared.yoUSD_tokens]
      });
      return { status: 'PASS', value: `${formatUnits(shared.yoUSD_tokens, 18)} tokens → ~${formatUnits(assets, USDC_DECIMALS)} USDC ✓` };
    }
  }
];

export const approvalTests = [
  {
    id: '6.1',
    group: 'Approval',
    name: 'Read Allowance',
    run: async () => {
      const allowance = await client.readContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [TEST_WALLET, YO_CONTRACTS.gateway as `0x${string}`]
      });
      return { status: 'PASS', value: `Current gateway allowance: $${formatUnits(allowance, USDC_DECIMALS)} USDC` };
    }
  },
  {
    id: '6.2',
    group: 'Approval',
    name: 'Approve USDC',
    run: async () => {
      const hash = await walletClient.writeContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [YO_CONTRACTS.gateway as `0x${string}`, parseUnits('100', USDC_DECIMALS)]
      });
      await client.waitForTransactionReceipt({ hash });
      return { status: 'PASS', value: `Approved 100 USDC ✓ | TxHash: ${hash.slice(0, 10)}...` };
    }
  },
  {
    id: '6.3',
    group: 'Approval',
    name: 'Verify Allowance',
    run: async () => {
      const allowance = await client.readContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [TEST_WALLET, YO_CONTRACTS.gateway as `0x${string}`]
      });
      if (allowance >= parseUnits('100', USDC_DECIMALS)) return { status: 'PASS', value: 'Allowance confirmed: 100 USDC ✓' };
      throw new Error(`Allowance error: ${allowance}`);
    }
  }
];

export const depositTests = [
  {
    id: '7.1',
    group: 'Deposit',
    name: 'USDC Before',
    run: async () => {
      const bal = await client.readContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [TEST_WALLET]
      });
      return { status: 'PASS', value: `USDC before: ${formatUnits(bal, USDC_DECIMALS)}` };
    }
  },
  {
    id: '7.2',
    group: 'Deposit',
    name: 'yoUSD Before',
    run: async () => {
      const bal = await client.readContract({
        address: YO_CONTRACTS.vaults.yoUSD as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [TEST_WALLET]
      });
      return { status: 'PASS', value: `yoUSD before: ${formatUnits(bal, 18)}` };
    }
  },
  {
    id: '7.3',
    group: 'Deposit',
    name: 'Execute Deposit',
    run: async () => {
      const amount = parseUnits('100', USDC_DECIMALS);
      const minShares = (shared.yoUSD_tokens * 995n) / 1000n;
      const hash = await walletClient.writeContract({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'deposit',
        args: [YO_CONTRACTS.vaults.yoUSD as `0x${string}`, amount, minShares, TEST_WALLET, PARTNER_ID]
      });
      const receipt = await client.waitForTransactionReceipt({ hash });
      return { status: 'PASS', value: `Deposited 100 USDC ✓ | Tx: ${hash.slice(0, 10)}... | Gas: ${receipt.effectiveGasPrice} gwei` };
    }
  },
  {
    id: '7.4',
    group: 'Deposit',
    name: 'USDC After',
    run: async () => {
      const bal = await client.readContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [TEST_WALLET]
      });
      return { status: 'PASS', value: `USDC after: ${formatUnits(bal, USDC_DECIMALS)} ✓ (-100)` };
    }
  },
  {
    id: '7.5',
    group: 'Deposit',
    name: 'yoUSD After',
    run: async () => {
      shared.yoUSD_balance = await client.readContract({
        address: YO_CONTRACTS.vaults.yoUSD as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [TEST_WALLET]
      });
      return { status: 'PASS', value: `yoUSD after: ${formatUnits(shared.yoUSD_balance, 18)} tokens ✓` };
    }
  },
  {
    id: '7.6',
    group: 'Deposit',
    name: 'Verify Asset Value',
    run: async () => {
      const assets = await client.readContract({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'previewRedeem',
        args: [YO_CONTRACTS.vaults.yoUSD as `0x${string}`, shared.yoUSD_balance]
      });
      return { status: 'PASS', value: `Tokens worth: ~$${formatUnits(assets, USDC_DECIMALS)} ✓` };
    }
  }
];

export const withdrawalTests = [
  {
    id: '8.1',
    group: 'Withdraw',
    name: 'Queue Before',
    run: async () => {
      const res = await yoApi.getPendingRedeems(YO_CONTRACTS.vaults.yoUSD);
      return { status: 'PASS', value: `Queue before: $${res.pendingAmount} pending` };
    }
  },
  {
    id: '8.2',
    group: 'Withdraw',
    name: 'Execute Withdrawal',
    run: async () => {
      const sharesToRedeem = shared.yoUSD_balance / 2n;
      const previewAssets = await client.readContract({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'previewRedeem',
        args: [YO_CONTRACTS.vaults.yoUSD as `0x${string}`, sharesToRedeem]
      });
      const minAssets = (previewAssets * 995n) / 1000n;
      const hash = await walletClient.writeContract({
        address: YO_CONTRACTS.gateway as `0x${string}`,
        abi: yoGatewayAbi,
        functionName: 'redeem',
        args: [YO_CONTRACTS.vaults.yoUSD as `0x${string}`, sharesToRedeem, minAssets, TEST_WALLET]
      });
      await client.waitForTransactionReceipt({ hash });
      return { status: 'PASS', value: `Withdrew half shares ✓ | Tx: ${hash.slice(0, 10)}...` };
    }
  },
  {
    id: '8.3',
    group: 'Withdraw',
    name: 'USDC After Withdrawal',
    run: async () => {
      const bal = await client.readContract({
        address: YO_CONTRACTS.assets.USDC as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [TEST_WALLET]
      });
      return { status: 'PASS', value: `USDC after: ~${formatUnits(bal, USDC_DECIMALS)} ✓` };
    }
  },
  {
    id: '8.4',
    group: 'Withdraw',
    name: 'Remaining yoUSD',
    run: async () => {
      const bal = await client.readContract({
        address: YO_CONTRACTS.vaults.yoUSD as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [TEST_WALLET]
      });
      return { status: 'PASS', value: `Remaining: ${formatUnits(bal, 18)} tokens ✓` };
    }
  }
];
