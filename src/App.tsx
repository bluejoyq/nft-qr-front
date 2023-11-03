import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon, polygonMumbai } from "viem/chains";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  CssBaseline,
  ThemeProvider,
  extendTheme,
  CssVarsProvider,
} from "@mui/joy";
import { Layout } from "./presentation/common/Layout";
const queryClient = new QueryClient();
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: import.meta.env.DEV ? polygonMumbai : polygon,
    transport: http(),
  }),
});

const theme = extendTheme();
export const App = (): ReactElement => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssVarsProvider defaultMode="dark">
          <QueryClientProvider client={queryClient}>
            <WagmiConfig config={config}>
              <Layout>
                <RouterProvider router={router} />
              </Layout>

              <CssBaseline />
              <ReactQueryDevtools initialIsOpen={false} />
            </WagmiConfig>
          </QueryClientProvider>
        </CssVarsProvider>
      </ThemeProvider>
    </>
  );
};
