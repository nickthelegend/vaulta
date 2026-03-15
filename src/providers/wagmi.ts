import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { 
  metaMaskWallet, 
  walletConnectWallet, 
  rainbowWallet, 
  coinbaseWallet 
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, coinbaseWallet, rainbowWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'VAULTA',
    projectId: 'YOUR_PROJECT_ID', // Recommended to provide a WalletConnect project ID
  }
);

export const wagmiConfig = createConfig({
  connectors,
  chains: [base],
  transports: {
    [base.id]: http('https://mainnet.base.org'), 
  },
  ssr: true,
});
