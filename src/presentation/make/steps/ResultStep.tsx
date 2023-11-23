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
import axios from "axios";

interface ResultStepProps {
  handleReset: () => void;
}
export const ResultStep = ({ handleReset }: ResultStepProps): ReactElement => {
  const { watch, getValues } = useNftQrFormContext();
  const {
    mutate,
    data: result,
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
            resultImageSrc={result?.imageSrc}
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
  resultImageSrc: string | undefined;
  error: Error | null;
  isPending: boolean;
  handleReset: () => void;
}
const Result = ({
  resultImageSrc,
  error,
  isPending,
  handleReset,
}: ResultProps) => {
  if (error) {
    throw error;
  }

  const handleDownload = async (resultImageSrc: string) => {
    const res = await axios(resultImageSrc, {
      responseType: "blob",
    });
    const blob = await new Blob([res.data], { type: "image/png" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qr-code.png";
    link.click();
  };
  if (!resultImageSrc || isPending) {
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
          src={resultImageSrc}
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
        <AppIconButton onClick={() => handleDownload(resultImageSrc)}>
          <DownloadIcon />
        </AppIconButton>
      </Box>
    </Box>
  );
};
