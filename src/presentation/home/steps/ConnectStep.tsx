import { pageContentStyles } from "@/presentation/common/styles";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactElement } from "react";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";

export const ConnectStep = (): ReactElement => {
  const { reset } = useConnect({
    connector: new MetaMaskConnector(),
  });
  return (
    <Box css={pageContentStyles}>
      <ErrorBoundary onReset={reset} fallbackRender={AppError}>
        <ConnectButton />
      </ErrorBoundary>
    </Box>
  );
};

const ConnectButton = () => {
  const { isConnected } = useAccount();
  const { connect, isLoading, error } = useConnect({
    connector: new MetaMaskConnector(),
  });

  if (error) {
    throw error;
  }
  if (isConnected) return null;

  return (
    <LoadingButton
      onClick={() => {
        connect();
      }}
      variant="contained"
      color="primary"
      loading={isLoading}
    >
      connect
    </LoadingButton>
  );
};
