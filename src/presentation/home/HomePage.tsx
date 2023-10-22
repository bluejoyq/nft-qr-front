import { ReactElement } from "react";
import { useAccount } from "wagmi";
import { ConnectStep } from "./steps/ConnectStep";
import { Steps } from "./steps";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const HomePage = (): ReactElement => {
  const { address } = useAccount();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NFT QR Code Generator
          </Typography>
          <Typography>{address ? address : "not connected"}</Typography>
        </Toolbar>
      </AppBar>
      {address == null && <ConnectStep />}
      {address != null && <Steps address={address} />}
    </>
  );
};
