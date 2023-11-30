import { QrHistory } from "@/domain/models";
import { usePalette } from "@/presentation/common/hooks/usePalette";
import { css } from "@emotion/react";
import { Box, Chip, Palette, Skeleton, Typography } from "@mui/joy";
import { ReactElement, forwardRef } from "react";

interface QRHistoryPreview {
  qrHistory: QrHistory;
}
export const QRHistoryPreview = ({
  qrHistory,
}: QRHistoryPreview): ReactElement => {
  const palette = usePalette();
  return (
    <Box css={styles.box}>
      <img src={qrHistory.imageSrc} css={styles.image} />
      <Box css={styles.typosContainer(palette)}>
        <Chip color="primary">
          <Typography>QRCODE Data</Typography>
        </Chip>
        <Typography typography={"h5"} css={styles.typo}>
          {qrHistory.qrData}
        </Typography>
      </Box>
    </Box>
  );
};

export const QRHistoryPreviewSkeleton = forwardRef<HTMLDivElement>(
  (_, ref): ReactElement => {
    return (
      <Box css={styles.box} ref={ref}>
        <Skeleton variant="rectangular" css={styles.image} />
        <Skeleton
          variant="rectangular"
          css={css`
            aspect-ratio: 4.5;
            border-radius: 8px;
          `}
        />
      </Box>
    );
  },
);
const styles = {
  box: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    gap: 16px;
  `,
  image: css`
    width: 100%;
    height: auto;
    object-fit: contain;
    aspect-ratio: 1;
    border-radius: 8px;
  `,
  typosContainer: (palette: Palette) => css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
    background-color: ${palette.background.level2};
    border-radius: 8px;
    width: 100%;
  `,

  typo: css`
    word-break: break-all;
    width: 100%;
  `,
  link: css`
    width: 100%;
    text-decoration: underline;
  `,
};
