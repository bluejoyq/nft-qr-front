import { QrHistory } from "@/domain/models";
import { ReactElement } from "react";
import { PhotoPreviewSrc } from "./PhotoPreview";
import {
  AppButton,
  AppIconButton,
} from "@/presentation/common/components/AppButton";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Box, Typography } from "@mui/joy";
import { css } from "@emotion/react";
import { Flex } from "@/presentation/common/components/Flex";
interface QRResultProps {
  result: QrHistory;
}
export const QRResult = ({ result }: QRResultProps): ReactElement => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result.imageSrc;
    link.click();
  };
  return (
    <>
      <Box css={styles.resultBox}>
        <PhotoPreviewSrc src={result.imageSrc} />
        <Box css={styles.actionBox}>
          <AppButton
            onClick={() => {
              window.location.reload();
            }}
          >
            <Typography typography={"title-lg"}>Restart</Typography>
          </AppButton>
          <Flex />
          <AppIconButton
            onClick={handleDownload}
            color={"success"}
            variant="solid"
          >
            <DownloadRoundedIcon />
          </AppIconButton>
        </Box>
      </Box>
    </>
  );
};

const styles = {
  resultBox: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  actionBox: css`
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: end;
    align-items: center;
  `,
};
