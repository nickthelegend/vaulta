'use client';

import { useMemo, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useProfile, useSignIn } from '@farcaster/auth-kit';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { FC_SESSION_KEY } from '@/src/lib/constants';

export function useVaultaAuth() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const { profile: farcasterUser, isAuthenticated: isFarcasterConnected } = useProfile();
  const { signIn: connectFarcaster, isPolling: isFarcasterConnecting } = useSignIn({});
  const { isConnecting: isWalletConnecting } = useAccount();

  const isConnecting = isWalletConnecting || isFarcasterConnecting;

  // Unified state
  const isFullyConnected = !!(address || farcasterUser);

  const displayName = useMemo(() => {
    if (farcasterUser?.username) return `@${farcasterUser.username}`;
    if (address) return `${address.slice(0, 6)}...${address.slice(-4)}`;
    return 'Guest';
  }, [address, farcasterUser]);

  const avatar = farcasterUser?.pfpUrl;

  const disconnect = () => {
    wagmiDisconnect();
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FC_SESSION_KEY);
    }
  };

  return {
    address,
    isConnected,
    chainId,
    farcasterUser,
    isFarcasterConnected,
    isFullyConnected,
    isConnecting,
    displayName,
    avatar,
    connectWallet: openConnectModal,
    connectFarcaster,
    disconnect
  };
}
