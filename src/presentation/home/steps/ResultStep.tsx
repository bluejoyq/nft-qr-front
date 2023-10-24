import { css } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { usePostQrCode } from "../hooks/usePostQrCode";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";
import { AppError } from "@/presentation/common/components/AppError";
import DownloadIcon from "@mui/icons-material/Download";
import { ErrorBoundary } from "react-error-boundary";
import { NftPreview } from "@/presentation/common/components/NftPreview";

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
    <>
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        `}
      >
        <NftPreview nft={nft} />
        <Typography>QR Data : {qrData}</Typography>
      </Box>
      {isIdle ? (
        <Button
          onClick={async () => {
            mutate(getValues());
          }}
          variant="contained"
        >
          Generate
        </Button>
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
    </>
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
      <Box>
        <Button onClick={handleReset}>
          <Typography variant="h5">Restart</Typography>
        </Button>
        <IconButton onClick={() => handleDownload(resultImage)}>
          <DownloadIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
