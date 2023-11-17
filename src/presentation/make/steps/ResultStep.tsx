import { css } from "@emotion/react";

import { ReactElement } from "react";
import { usePostQrCode } from "../hooks/usePostQrCode";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";
import { AppError } from "@/presentation/common/components/AppError";
import DownloadIcon from "@mui/icons-material/Download";
import { ErrorBoundary } from "react-error-boundary";
import { NftPreview } from "@/presentation/common/components/NftPreview";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/data/firebase";
import { Alert, Box, CircularProgress, Typography } from "@mui/joy";
import {
  AppButton,
  AppIconButton,
} from "@/presentation/common/components/AppButton";

interface ResultStepProps {
  handleReset: () => void;
}
export const ResultStep = ({ handleReset }: ResultStepProps): ReactElement => {
  const { watch, getValues } = useNftQrFormContext();
  const {
    mutate,
    data: resultImage,
    error,
    reset,
    isPending,
    isIdle,
  } = usePostQrCode();

  const nft = watch("nft");

  const qrData = watch("qrData");
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      `}
    >
      <NftPreview nft={nft} />
      <Alert>
        QR Data : <Typography typography={"h4"}>{qrData}</Typography>
      </Alert>
      {isIdle ? (
        <AppButton
          onClick={async () => {
            mutate(getValues());
            logEvent(analytics, "generate");
          }}
        >
          Generate
        </AppButton>
      ) : (
        <ErrorBoundary onReset={reset} fallbackRender={AppError}>
          <Result
            resultImage={resultImage}
            error={error}
            isPending={isPending}
            handleReset={handleReset}
          />
        </ErrorBoundary>
      )}
    </Box>
  );
};

interface ResultProps {
  resultImage: Blob | undefined;
  error: Error | null;
  isPending: boolean;
  handleReset: () => void;
}
const Result = ({
  resultImage,
  error,
  isPending,
  handleReset,
}: ResultProps) => {
  if (error) {
    throw error;
  }

  const handleDownload = (resultImage: Blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(resultImage);
    link.download = "qr-code.png";
    link.click();
  };
  if (!resultImage || isPending) {
    return (
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        `}
      >
        <Typography>Generating QR Code...</Typography>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Box>
        <img
          src={URL.createObjectURL(resultImage)}
          css={css`
            width: 100%;
            max-width: 500px;
            aspect-ratio: 1;
          `}
        />
      </Box>
      <Box
        css={css`
          display: flex;
          gap: 10px;
          align-items: center;
        `}
      >
        <AppButton onClick={handleReset}>Restart</AppButton>
        <AppIconButton onClick={() => handleDownload(resultImage)}>
          <DownloadIcon />
        </AppIconButton>
      </Box>
    </Box>
  );
};
