import { configureChains, createConfig } from 'wagmi'
import { mainnet, bsc, bscTestnet, goerli, localhost, foundry } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'

export const Default_Chain_Id = 5

const walletConnectProjectId = '9da0946eba351cb153deff70667959c8'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // [mainnet, bsc, bscTestnet, goerli, localhost, foundry],
  [bsc],
  [publicProvider()],
)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'mammoth',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        projectId: walletConnectProjectId,
        name: 'mammoth',
        relayUrl: 'wss://relay.walletconnect.org'
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

export const supportChains = chains