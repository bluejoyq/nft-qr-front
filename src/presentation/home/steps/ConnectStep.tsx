import { pageContentStyles } from "@/presentation/common/styles";
import { Box, Button, TextField, Typography, css } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactElement, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { analytics } from "@/data/firebase";
import { logEvent } from "firebase/analytics";

interface ConnectStepProps {
  onNext: (address: string) => void;
}
export const ConnectStep = ({ onNext }: ConnectStepProps): ReactElement => {
  const { reset, connect, isLoading, error } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const { address } = useAccount();
  const [val, setVal] = useState("");
  useEffect(() => {
    if (address == null) return;
    handleNext(address);
  }, [address]);

  const handleNext = (address: string) => {
    onNext(address);
  };
  return (
    <Box css={pageContentStyles}>
      <ErrorBoundary onReset={reset} fallbackRender={AppError}>
        <ConnectButton connect={connect} isLoading={isLoading} error={error} />
      </ErrorBoundary>
      <Typography>or</Typography>
      <Box
        css={css`
          width: 100%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        `}
      >
        <TextField
          label={"EVM address"}
          onChange={(e) => setVal(e.target.value)}
          value={val}
        />
        <Button variant="contained" color="primary" onClick={() => onNext(val)}>
          enter
        </Button>
      </Box>
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
      connect with metamask
    </LoadingButton>
  );
};
