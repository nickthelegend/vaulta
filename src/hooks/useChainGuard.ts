'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { CHAIN_ID } from '@/src/lib/constants';

export function useChainGuard() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const needsConnect = !isConnected;
  const needsSwitch = isConnected && chainId !== CHAIN_ID;

  const switchToBase = () => {
    switchChain({ chainId: CHAIN_ID });
  };

  return {
    needsConnect,
    needsSwitch,
    switchToBase,
  };
}
