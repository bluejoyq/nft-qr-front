import { pageContentStyles } from "@/presentation/common/styles";
import { Box, Button } from "@mui/material";
import { ReactElement } from "react";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const ConnectStep = (): ReactElement => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  return (
    <Box css={pageContentStyles}>
      {!isConnected && (
        <Button
          onClick={() => {
            connect();
          }}
          variant="contained"
          color="primary"
        >
          connect
        </Button>
      )}
    </Box>
  );
};
