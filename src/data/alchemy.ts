import { Network, Alchemy } from "alchemy-sdk";

export const getAlchemy = (network: Network) => {
  const settings = {
    apiKey: import.meta.env.VITE_ALCHEMEY_API_KEY,
    network: network,
  };

  return new Alchemy(settings);
};
