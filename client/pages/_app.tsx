import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import Router from "components/Elements/Router";
import { ModalContextProvider } from "context/modalContext";
import { Layout } from "components/Elements/Layout";

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const mantleChain: Chain = {
  id: 5001,
  name: 'Mantle',
  network: 'Mantle Goerli',
  nativeCurrency: {
    decimals: 18,
    name: 'BIT',
    symbol: 'BIT',
  },
  blockExplorers: {
    default: { name: 'MantleExplorer', url: 'https://explorer.testnet.mantle.xyz/' },
    etherscan: { name: 'MantleExplorer', url: 'https://explorer.testnet.mantle.xyz/' },
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.mantlenetwork.io/'],
      webSocket: undefined
    },
    public: {
      http: ['https://rpc.testnet.mantlenetwork.io/'],
      webSocket: undefined
    }
  },
  testnet: true,
};

const { provider, webSocketProvider, chains } = configureChains(
  [polygon, mantleChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://rpc.testnet.mantlenetwork.io/`,
      }),
    }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Broadcastr",
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
  autoConnect: true,
});

const client = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY ?? "",
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={client}>
      <WagmiConfig client={wagmiClient}>
        <Head> broadcastr </Head>
        <RainbowKitProvider chains={chains}>
          <ModalContextProvider>
            <Layout>
              <Router>
                <Component {...pageProps} />
              </Router>
            </Layout>
          </ModalContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </LivepeerConfig>
  );
}

export default MyApp;
