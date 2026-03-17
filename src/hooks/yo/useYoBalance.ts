import { useReadContract } from 'wagmi';
import { erc20Abi, yoGatewayAbi } from '@/src/lib/yo/abi';
import { formatUnits } from 'viem';
import { USDC_DECIMALS, YO_CONTRACTS } from '@/src/lib/yo/constants';

export function useYoBalance(vaultAddress: `0x${string}`, userAddress: `0x${string}` | undefined) {
  // 1. Read yoToken balance (shares)
  const { data: yoTokenBalance, isLoading: isBalanceLoading } = useReadContract({
    address: vaultAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress },
  });

  // 2. Preview redeem to get asset value (USDC)
  const { data: previewAssets, isLoading: isPreviewLoading } = useReadContract({
    address: YO_CONTRACTS.gateway as `0x${string}`,
    abi: yoGatewayAbi,
    functionName: 'previewRedeem',
    args: (vaultAddress && yoTokenBalance !== undefined) ? [vaultAddress, yoTokenBalance] : undefined,
    query: { enabled: !!yoTokenBalance },
  });

  const assetValueUSD = previewAssets ? parseFloat(formatUnits(previewAssets, USDC_DECIMALS)) : 0;

  return {
    yoTokenBalance: yoTokenBalance || BigInt(0),
    assetValueUSD,
    isLoading: isBalanceLoading || isPreviewLoading,
  };
}
