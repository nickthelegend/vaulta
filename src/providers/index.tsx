'use client';

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { wagmiConfig } from "./wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import "@farcaster/auth-kit/styles.css";

const queryClient = new QueryClient();
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const farcasterConfig = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'vaulta.xyz',
  siweUri: 'https://vaulta.xyz/api/siwe',
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <AuthKitProvider config={farcasterConfig}>
              {children}
            </AuthKitProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ConvexProvider>
  );
}
