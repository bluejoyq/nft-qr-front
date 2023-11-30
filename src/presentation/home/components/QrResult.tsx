import { QrHistory } from "@/domain/models";
import { css } from "@emotion/react";
import { Box, Chip, Typography } from "@mui/joy";
import { ReactElement } from "react";

interface QrResultProps {
  qrHistory: QrHistory;
}
export const QrResult = ({ qrHistory }: QrResultProps): ReactElement => {
  return (
    <Box css={styles.box}>
      <img src={qrHistory.imageSrc} css={styles.image} />
      <Box css={styles.typosContainer}>
        <Box>
          <Chip color="primary">Data</Chip>
          <Typography typography={"h5"} css={styles.typo}>
            {qrHistory.qrData}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
const styles = {
  box: css`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    aspect-ratio: 2;
    gap: 32px;
  `,
  image: css`
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 1;
  `,
  typosContainer: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
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
