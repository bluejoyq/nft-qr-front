import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon, polygonMumbai } from "viem/chains";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline } from "@mui/material";
import { Layout } from "./presentation/common/Layout";
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: import.meta.env.DEV ? polygonMumbai : polygon,
    transport: http(),
  }),
});

const queryClient = new QueryClient();

export const App = (): ReactElement => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <Layout>
            <RouterProvider router={router} />
          </Layout>

          <CssBaseline />
          <ReactQueryDevtools initialIsOpen={false} />
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
};
