import { Alert, Box, Palette, Typography } from "@mui/joy";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { analytics } from "@/data/firebase";
import { logEvent } from "firebase/analytics";
import { css } from "@emotion/react";
import { AppButton } from "@/presentation/common/components/AppButton";
import { AppInput } from "@/presentation/common/components/AppInput";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { usePalette } from "@/presentation/common/hooks/usePalette";
interface ConnectStepProps {
  stepNext: (address: string) => void;
  defaultValue: string;
}
export const ConnectStep = ({
  stepNext,
  defaultValue,
}: ConnectStepProps): ReactElement => {
  const { reset, connect, isLoading, error } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const { address } = useAccount();
  const [val, setVal] = useState(defaultValue ?? "");
  useEffect(() => {
    if (address == null) return;
    setVal(address);
  }, [address]);

  const isValidEvmAddress = (address: string) => {
    return address.startsWith("0x") && address.length == 42;
  };
  const palette = usePalette();
  return (
    <Box css={styles.container}>
      <Box css={styles.addressContainer(palette)}>
        <Box css={styles.inputContainer}>
          <AppInput
            placeholder={"EVM address"}
            slotProps={{
              input: {
                ref: inputRef,
              },
            }}
            defaultValue={defaultValue}
          />
          <AppButton
            onClick={() => {
              if (inputRef.current == null) return;
              setVal(inputRef.current.value);
            }}
          >
            <Typography typography={"title-lg"}>Use Address</Typography>
          </AppButton>
        </Box>
        <Typography>or</Typography>
        <ErrorBoundary onReset={reset} fallbackRender={AppError}>
          <ConnectButton
            connect={connect}
            isLoading={isLoading}
            error={error}
          />
        </ErrorBoundary>
      </Box>
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: center;
          width: 100%;
          overflow: hidden;
        `}
      >
        <Typography typography={"h3"}>Current Address</Typography>
        <Typography
          typography={"title-lg"}
          css={css`
            line-break: anywhere;
          `}
        >
          {val ? `${val}` : "Not Selected"}
        </Typography>
      </Box>
      <Box css={styles.nextBtnBox}>
        {val && !isValidEvmAddress(val) && (
          <Alert
            color="danger"
            css={css`
              border-radius: 8px;
            `}
          >
            Invalid EVM Address
          </Alert>
        )}
        <AppButton
          onClick={() => stepNext(val)}
          css={styles.nextButton}
          disabled={!isValidEvmAddress(val)}
        >
          <Typography typography={"h3"}>Next</Typography>
        </AppButton>
      </Box>
    </Box>
  );
};
const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,
  nextButton: css`
    margin-top: 16px;
    width: 100%;
    max-width: 500px;
    padding: 16px;
  `,
  inputContainer: css`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
    max-width: 600px;
  `,
  addressContainer: (palette: Palette) => css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${palette.background.level2};
    border-radius: 8px;
    padding: 16px;
  `,
  nextBtnBox: css`
    width: 100%;
    max-width: 500px;
  `,
};

interface ConnectButtonProps {
  connect: () => void;
  isLoading: boolean;
  error: Error | null;
}
const ConnectButton = ({ connect, isLoading, error }: ConnectButtonProps) => {
  if (error) {
    throw error;
  }

  return (
    <AppButton
      onClick={() => {
        connect();
        logEvent(analytics, "connect");
      }}
      color="primary"
      loading={isLoading}
      css={css`
        display: flex;
        gap: 8px;
        svg {
          width: 24px;
          height: 24px;
        }
      `}
    >
      <WalletOutlinedIcon />
      <Typography typography={"title-lg"}> Connect with Metamask</Typography>
    </AppButton>
  );
};
