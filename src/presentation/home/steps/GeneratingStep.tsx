import { pageContentStyles } from "@/presentation/common/styles";
import { Box, CircularProgress } from "@mui/material";
import { ReactElement } from "react";

export const GeneratingStep = (): ReactElement => {
  return (
    <Box css={pageContentStyles}>
      <CircularProgress />
    </Box>
  );
};
