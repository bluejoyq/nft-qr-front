import { AppButton } from "@/presentation/common/components/AppButton";
import { AppLink } from "@/presentation/common/components/AppLink";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/joy";
import { ReactElement } from "react";

export const HomeBanner = (): ReactElement => {
  return (
    <Box css={styles.container}>
      <img src={"sample.png"} css={styles.example} />
      <Typography typography="h1" css={styles.title}>
        Create your own
        <br />
        Personalized
        <br />
        QR Codes
      </Typography>
      <AppLink to="/make">
        <AppButton>Get Started</AppButton>
      </AppLink>
    </Box>
  );
};

const styles = {
  container: css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    flex-shrink: 0;
  `,
  example: css`
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
  `,
  title: css`
    font-size: 48px;
    font-weight: 700;
  `,
};
