import { Network, Alchemy } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: import.meta.env.VITE_ALCHEMEY_API_KEY,
  network: import.meta.env.DEV ? Network.ETH_SEPOLIA : Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);
