import { ReactElement, Suspense } from "react";
import { useReadQrHistories } from "../hooks/useReadQrHistories";
import { Box, CircularProgress } from "@mui/joy";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { css } from "@emotion/react";

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
      <Box css={styles.container}>
        {qrs?.map((qr) => {
          return (
            <div key={qr.id}>
              <img src={qr.imageSrc} css={styles.image} />
            </div>
          );
        })}
      </Box>
    </ErrorBoundary>
  );
};

const styles = {
  container: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    row-gap: 16px;
    column-gap: 16px;
  `,
  image: css`
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 1;
  `,
};
