import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rabbyWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  avalanche,
  zkSync,
  bsc,
  goerli,
  polygonMumbai,
} from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
// Chains we are going to support
// Connectores for these chains
// wagmiclient

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, avalanche, bsc, goerli, polygonMumbai],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: "Rainbow Tutorial",
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: "My RainbowKit App" }),
      walletConnectWallet({ chains }),
      rabbyWallet({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
