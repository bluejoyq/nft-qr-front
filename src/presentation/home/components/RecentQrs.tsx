import { ReactElement, Suspense } from "react";
import { useReadQrHistories } from "../hooks/useReadQrHistories";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { css } from "@emotion/react";
import { QrResult } from "./QrResult";

export const RecentQrs = (): ReactElement => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Result />
    </Suspense>
  );
};

const Result = () => {
  const { data, refetch } = useReadQrHistories();
  const qrs = data?.pages.map((page) => page.data).flat();
  return (
    <ErrorBoundary fallbackRender={AppError} onReset={() => refetch()}>
      <Typography typography={"h1"}>Recent Qrs</Typography>
      <Box css={styles.container}>
        {qrs?.map((qr) => {
          return <QrResult key={qr.id} qrHistory={qr} />;
        })}
      </Box>
    </ErrorBoundary>
  );
};

const styles = {
  container: css`
    display: grid;
    grid-template-columns: 1fr;
    height: 100%;
    row-gap: 16px;
    column-gap: 16px;
  `,
};
