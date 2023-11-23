import { Box } from "@mui/joy";
import { ReactElement } from "react";
import { pageContentStyles, pagePaddingStyles } from "../common/styles";
import { css } from "@emotion/react";
import { RecentQrs } from "./components/RecentQrs";
import { HomeBanner } from "./components/HomeBanner";

export const HomePage = (): ReactElement => {
  return (
    <>
      <Box css={[pageContentStyles, pagePaddingStyles, styles.root]}>
        <HomeBanner />
        <RecentQrs />
      </Box>
    </>
  );
};

const styles = {
  root: css`
    justify-content: start;
    align-items: center;
    gap: 24px;
  `,
};
