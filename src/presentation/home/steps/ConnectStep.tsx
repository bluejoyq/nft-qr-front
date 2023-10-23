import { pageContentStyles } from "@/presentation/common/styles";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactElement } from "react";
import { useAccount, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const ConnectStep = (): ReactElement => {
  const { isConnected } = useAccount();
  const { connect, isLoading } = useConnect({
    connector: new MetaMaskConnector(),
  });
  return (
    <Box css={pageContentStyles}>
      {!isConnected && (
        <LoadingButton
          onClick={() => {
            connect();
          }}
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          connect
        </LoadingButton>
      )}
    </Box>
  );
};
