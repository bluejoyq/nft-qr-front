import { Box, Typography } from "@mui/joy";
import { ReactElement } from "react";
import { pageContentStyles, pagePaddingStyles } from "../common/styles";
import { css } from "@emotion/react";

export const HomePage = (): ReactElement => {
  return (
    <>
      <Box css={[pageContentStyles, pagePaddingStyles, styles.root]}>
        <img src={"sample.png"} css={styles.example} />
        <Typography typography="h1" css={styles.title}>
          Create your own
          <br />
          Personalized
          <br />
          QR Codes
        </Typography>
      </Box>
    </>
  );
};

const styles = {
  root: css`
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  example: css`
    width: 100%;
    max-width: 300px;
    margin-bottom: 32px;
    border-radius: 8px;
  `,
  title: css`
    font-size: 48px;
    font-weight: 700;
  `,
};
