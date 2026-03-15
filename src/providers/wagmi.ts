import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { 
  metaMaskWallet, 
  walletConnectWallet, 
  rainbowWallet, 
  coinbaseWallet 
} from '@rainbow-me/rainbowkit/wallets';

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://mainnet.base.org';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, coinbaseWallet, rainbowWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'VAULTA',
    projectId: 'YOUR_PROJECT_ID',
  }
);

export const wagmiConfig = createConfig({
  connectors,
  chains: [base],
  transports: {
    [base.id]: http(rpcUrl),
  },
  ssr: true,
});
