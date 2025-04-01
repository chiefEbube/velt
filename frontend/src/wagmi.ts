import { defineChain } from 'viem'
import { http, createConfig } from 'wagmi'
// import { metaMask } from 'wagmi/connectors'

export const metisSepolia = defineChain({
  id: 59902,
  name: 'Metis Sepolia',
  nativeCurrency: {
    name: 'Metis',
    symbol: 'sMETIS',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://sepolia.metisdevops.link'] },
  },
  blockExplorers: {
    default: { name: 'Metis Sepolia Testnet explorer', url: 'https://sepolia-explorer.metisdevops.link/' }, 
  },
  testnet: true,
})


export const config = createConfig({
  chains: [metisSepolia],
  transports: {
    [metisSepolia.id]: http(),
  },
})