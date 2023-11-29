import { ReactElement, Suspense } from "react";
import { useReadQrHistories } from "../hooks/useReadQrHistories";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { css } from "@emotion/react";
import { QrResult } from "./QrResult";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export const RecentQrs = (): ReactElement => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <Suspense fallback={<CircularProgress />}>
      <ErrorBoundary fallbackRender={AppError} onReset={reset}>
        <Result />
      </ErrorBoundary>
    </Suspense>
  );
};

const Result = () => {
  const { data } = useReadQrHistories();
  const qrs = data?.pages.map((page) => page.data).flat();
  return (
    <>
      <Typography typography={"h1"}>Recent Qrs</Typography>
      <Box css={styles.container}>
        {qrs?.map((qr) => {
          return <QrResult key={qr.id} qrHistory={qr} />;
        })}
      </Box>
    </>
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
