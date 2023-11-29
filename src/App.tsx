import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon, polygonMumbai } from "viem/chains";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline, extendTheme, CssVarsProvider } from "@mui/joy";
const queryClient = new QueryClient();
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: import.meta.env.DEV ? polygonMumbai : polygon,
    transport: http(),
  }),
});

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          "50": "#e0f2f1",
          "100": "#b2dfdb",
          "200": "#80cbc4",
          "300": "#4db6ac",
          "400": "#26a69a",
          "500": "#009688",
          "600": "#00897b",
          "700": "#00796b",
          "800": "#00695c",
          "900": "#004d40",
        },
      },
    },
  },
});
export const App = (): ReactElement => {
  return (
    <>
      <CssVarsProvider
        defaultMode="dark"
        theme={theme}
        colorSchemeSelector="#dark-mode"
        modeStorageKey="dark-mode"
      >
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={config}>
            <RouterProvider router={router} />

            <CssBaseline />
            <ReactQueryDevtools initialIsOpen={false} />
          </WagmiConfig>
        </QueryClientProvider>
      </CssVarsProvider>
    </>
  );
};
