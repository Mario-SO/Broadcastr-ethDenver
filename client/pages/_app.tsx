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
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import Router from "components/Elements/Router";
import { ModalContextProvider } from "context/modalContext";
import { Layout } from "components/Elements/Layout";

const { provider, webSocketProvider, chains } = configureChains(
  [polygon],
  [publicProvider()]
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
