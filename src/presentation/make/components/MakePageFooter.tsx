import { css } from "@emotion/react";
import { Box, Link, Typography } from "@mui/joy";

export const MakePageFooter = () => {
  return (
    <Box
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      `}
    >
      <Typography typography="h6">
        This service does not require any paid goods or tokens.
      </Typography>
      <Link href="https://github.com/bluejoyq">Developer Github</Link>
    </Box>
  );
};
