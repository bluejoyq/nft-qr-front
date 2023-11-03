import { css } from "@emotion/react";
import { Box, CircularProgress } from "@mui/joy";
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
