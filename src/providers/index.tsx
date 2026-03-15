'use client';

import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { wagmiConfig } from './wagmi';
import { vaultaRainbowTheme } from './rainbowkit';
import { farcasterConfig } from './farcaster';

import '@rainbow-me/rainbowkit/styles.css';
import '@farcaster/auth-kit/styles.css';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={vaultaRainbowTheme} initialChain={8453}>
          <AuthKitProvider config={farcasterConfig}>
            {children}
          </AuthKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
