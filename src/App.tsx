import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WagmiConfig, createConfig, mainnet, sepolia } from "wagmi";
import { createPublicClient, http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: import.meta.env.DEV ? sepolia : mainnet,
    transport: http(),
  }),
});

const queryClient = new QueryClient();

export const App = (): ReactElement => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <RouterProvider router={router} />
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
};
