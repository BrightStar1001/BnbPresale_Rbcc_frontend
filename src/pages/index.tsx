import React, { useState } from "react";
import Header from "@/layout/header";
import MainPage from "@/layout/mainpage";

import { useRouter } from 'next/router';
import {
  RainbowKitProvider,
  getDefaultWallets,
  Locale,
  getDefaultConfig,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  goerli
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { wallets } = getDefaultWallets({
  appName: 'Mazze Presale', 
  projectId: 'c278a3db8eed101935395863b318fff7',
});

const config = getDefaultConfig({
  appName: 'Mazze Presale',
  projectId: 'c278a3db8eed101935395863b318fff7',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    goerli,
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export default function Home() {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale} theme={lightTheme({
          accentColor: '#ffa200',
          accentColorForeground: 'black',
          borderRadius: 'medium',
          overlayBlur: 'small'
        })}>
          <Header />
          <MainPage />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
