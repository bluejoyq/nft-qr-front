import { NFT_PATH, PHOTO_PATH } from "@/domain/paths";
import { AppButton } from "@/presentation/common/components/AppButton";
import { AppLink } from "@/presentation/common/components/AppLink";
import { mq } from "@/presentation/common/constants/mq";
import { css } from "@emotion/react";
import { Box, Theme, Typography, useTheme } from "@mui/joy";
import { ReactElement } from "react";
import { ExampleQr } from "./ExampleQr";
export const HomeBanner = (): ReactElement => {
  const theme = useTheme();
  return (
    <Box css={styles.container}>
      <Box css={styles.typoContainer}>
        <Typography typography="body-lg" css={styles.topLabel(theme)}>
          Take QR Codes to the next level
        </Typography>
        <Typography typography="h1" css={styles.title}>
          Create Your Own
          <br />
          Personalized
          <br />
          QRCODE
        </Typography>
        <AppLink to={PHOTO_PATH}>
          <AppButton css={styles.btn}>
            <Typography typography={"h3"}>Start With Photo</Typography>
          </AppButton>
        </AppLink>
        <AppLink to={NFT_PATH}>
          <AppButton color="neutral" css={styles.btn}>
            <Typography typography={"h3"}>Start With NFT</Typography>
          </AppButton>
        </AppLink>
      </Box>
      <Box css={styles.exampleContainer}>
        <ExampleQr />
      </Box>
    </Box>
  );
};

const styles = {
  container: css`
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: start;
    gap: 16px;
    flex-shrink: 0;
    grid-template-rows: 1fr 1fr;
    padding: 16px;
    ${mq.wide} {
      padding: 48px 64px;
      gap: 64px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
    }
  `,
  btn: css`
    ${mq.wide} {
      padding: 16px 32px;
    }
  `,
  typoContainer: css`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 16px;
  `,
  exampleContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  topLabel: (theme: Theme) => css`
    color: ${theme.palette.primary[100]};
  `,

  title: css`
    font-size: 32px;
    font-weight: 700;
    ${mq.wide} {
      font-size: 48px;
    }
  `,
};
