import { css } from "@emotion/react";
import { Box, Link, Typography } from "@mui/joy";
import { pageContentStyles, pagePaddingStyles } from "../styles";

export const Footer = () => {
  return (
    <Box
      css={[
        pageContentStyles,
        pagePaddingStyles,
        css`
          height: 100px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        `,
      ]}
    >
      <Typography typography="h6">
        This service does not require any paid goods or tokens.
      </Typography>
      <Link href="https://github.com/bluejoyq">Developer Github</Link>
    </Box>
  );
};
