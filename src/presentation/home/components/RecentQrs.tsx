import { ReactElement, Suspense } from "react";
import { useReadQrHistories } from "../hooks/useReadQrHistories";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { css } from "@emotion/react";
import { QRHistoryPreview, QRHistoryPreviewSkeleton } from "./QRHistoryPreview";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { mq } from "@/presentation/common/constants/mq";

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
  const { data, sentryRef, isLoading, hasNextPage } = useReadQrHistories();
  const qrs = data?.pages.map((page) => page.data).flat();
  return (
    <>
      <Typography typography={"h1"}>Recent Qrs</Typography>
      <Box css={styles.container}>
        {qrs?.map((qr) => {
          return <QRHistoryPreview key={qr.id} qrHistory={qr} />;
        })}
        {(isLoading || hasNextPage) && (
          <QRHistoryPreviewSkeleton ref={sentryRef} />
        )}
      </Box>
    </>
  );
};

const styles = {
  container: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    gap: 16px;
    ${mq.wide} {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 32px;
    }
  `,
};
