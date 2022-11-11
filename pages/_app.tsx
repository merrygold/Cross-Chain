
import '@rainbow-me/rainbowkit/styles.css';
import {Chain , getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import NoSSR from 'react-no-ssr';

const Bsc: Chain = {
  id: 97,
  name: 'BSC Testnet',
  network: 'BNB',
  iconUrl: 'https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'BSC Testnet',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsctestapi.terminet.io/rpc',
  },
  blockExplorers: {
    default: { name: 'BNB', url: 'https://explorer.binance.org/smart-testnet/' },
    etherscan: { name: 'BNB', url: 'https://explorer.binance.org/smart-testnet/' },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [chain.goerli ,chain.polygonMumbai , Bsc ],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: 'Temple of Ceaser',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


function MyApp({ Component, pageProps }: AppProps) {
  return (

    <NoSSR>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}  >
            <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
    </NoSSR>
  );
}

export default MyApp;
