import { Box, CircularProgress, css } from "@mui/material";
import { ReactElement } from "react";

export const GeneratingStep = (): ReactElement => {
  return (
    <Box
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <CircularProgress />
    </Box>
  );
};
