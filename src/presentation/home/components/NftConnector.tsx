import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

export const NftConnector = ({
  address,
}: {
  address: string;
}): ReactElement => {
  return (
    <Box
      css={css`
        display: flex;
        align-items: center;
        gap: 10px;
      `}
    >
      {address && (
        <Typography>
          {address.substring(0, 6)}...
          {address.substring(address.length - 4, address.length)}
        </Typography>
      )}
    </Box>
  );
};
