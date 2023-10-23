import { ReactElement } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectStep } from "./steps/ConnectStep";
import { Steps } from "./steps";
import { AppBar, Box, Button, Toolbar, Typography, css } from "@mui/material";

export const HomePage = (): ReactElement => {
  const { address } = useAccount();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NFT QR Code Generator
          </Typography>
          <NftConnector />
        </Toolbar>
      </AppBar>
      {address == null && <ConnectStep />}
      {address != null && <Steps address={address} />}
    </>
  );
};
const NftConnector = (): ReactElement => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
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

      {isConnected && (
        <Button
          onClick={() => {
            disconnect();
          }}
          variant="contained"
          color="error"
        >
          disconnect
        </Button>
      )}
    </Box>
  );
};
