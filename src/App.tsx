import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon, polygonMumbai } from "viem/chains";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Layout } from "./presentation/common/Layout";
import { green, orange } from "@mui/material/colors";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: import.meta.env.DEV ? polygonMumbai : polygon,
    transport: http(),
  }),
  queryClient: queryClient,
});

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
export const App = (): ReactElement => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={config}>
            <Layout>
              <RouterProvider router={router} />
            </Layout>

            <CssBaseline />
            <ReactQueryDevtools initialIsOpen={false} />
          </WagmiConfig>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};
