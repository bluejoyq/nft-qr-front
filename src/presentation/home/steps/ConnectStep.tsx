import { pageContentStyles } from "@/presentation/common/styles";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactElement } from "react";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { analytics } from "@/data/firebase";
import { logEvent } from "firebase/analytics";

export const ConnectStep = (): ReactElement => {
  const { reset, connect, isLoading, error } = useConnect({
    connector: new MetaMaskConnector(),
  });
  return (
    <Box css={pageContentStyles}>
      <ErrorBoundary onReset={reset} fallbackRender={AppError}>
        <ConnectButton connect={connect} isLoading={isLoading} error={error} />
      </ErrorBoundary>
    </Box>
  );
};

interface ConnectButtonProps {
  connect: () => void;
  isLoading: boolean;
  error: Error | null;
}
const ConnectButton = ({ connect, isLoading, error }: ConnectButtonProps) => {
  const { isConnected } = useAccount();

  if (error) {
    throw error;
  }
  if (isConnected) return null;

  return (
    <LoadingButton
      onClick={() => {
        connect();
        logEvent(analytics, "connect");
      }}
      variant="contained"
      color="primary"
      loading={isLoading}
    >
      connect
    </LoadingButton>
  );
};
