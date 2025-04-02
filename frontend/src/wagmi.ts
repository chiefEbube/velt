import { defineChain } from "viem";
import { http, cookieStorage, createConfig, createStorage } from "wagmi";

export const metisSepolia = defineChain({
  id: 59902,
  name: "Metis Sepolia",
  nativeCurrency: {
    name: "Metis",
    symbol: "sMETIS",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://sepolia.metisdevops.link"] },
  },
  blockExplorers: {
    default: {
      name: "Metis Sepolia Testnet explorer",
      url: "https://sepolia-explorer.metisdevops.link/",
    },
  },
  testnet: true,
});

export function getConfig() {
  return createConfig({
    chains: [metisSepolia],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [metisSepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
