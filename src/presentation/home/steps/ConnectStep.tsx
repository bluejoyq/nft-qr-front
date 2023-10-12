import { pageContentStyles } from "@/presentation/common/styles";
import { Box } from "@mui/material";
import { ReactElement } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const ConnectStep = (): ReactElement => {
  return (
    <Box css={pageContentStyles}>
      <NftConnector />
    </Box>
  );
};
const NftConnector = (): ReactElement => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <>
      {isConnected ? (
        <button
          onClick={() => {
            disconnect();
          }}
        >
          disconnect
        </button>
      ) : (
        <button
          onClick={() => {
            connect();
          }}
        >
          connect
        </button>
      )}
    </>
  );
};
