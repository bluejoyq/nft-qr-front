import { Box, Button, Input, Typography } from "@mui/joy";
import { ReactElement, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { analytics } from "@/data/firebase";
import { logEvent } from "firebase/analytics";
import { css } from "@emotion/react";
import { AppButton } from "@/presentation/common/components/AppButton";

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
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <Box
        css={css`
          width: 100%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        `}
      >
        <Input
          placeholder={"EVM address"}
          onChange={(e) => setVal(e.target.value)}
          value={val}
        />
        <AppButton color="primary" onClick={() => onNext(val)}>
          Enter
        </AppButton>
      </Box>
      <Typography>or</Typography>
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
    <AppButton
      onClick={() => {
        connect();
        logEvent(analytics, "connect");
      }}
      color="primary"
      loading={isLoading}
    >
      Connect with Metamask
    </AppButton>
  );
};
