import { ReactElement } from "react";

import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { alchemy } from "@/data/alchemy";
import { css } from "@emotion/react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ConnectStep } from "./steps/ConnectStep";
import { Steps } from "./steps";

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

interface OwnerNftsProps {
  address: string;
}
const OwnerNfts = ({ address }: OwnerNftsProps): ReactElement => {
  const { data, isLoading } = useQuery({
    queryKey: ["nfts", address],
    queryFn: async () => {
      if (address == null) return;
      return await alchemy.nft.getNftsForOwner(address);
    },
  });

  return (
    <div
      css={css`
        overflow-x: hidden;
        width: 100%;
      `}
    >
      {isLoading && <div>loading...</div>}
      {data?.ownedNfts.length === 0 && (
        <div>
          <b>no nfts</b>
        </div>
      )}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          width: 100%;
          gap: 10px;
        `}
      >
        {data?.ownedNfts.map((nft) => {
          return (
            <div key={`${nft.contract.address}/${nft.tokenId}`}>
              <div>
                <img
                  src={nft.rawMetadata?.image}
                  alt={nft.title}
                  css={css`
                    width: 100%;
                  `}
                />
              </div>
              <div>
                <div>
                  <b>{nft.title}</b>
                </div>
                <div>
                  <b>{nft.description}</b>
                </div>
                <div>
                  <b>{nft.rawMetadata?.external_url}</b>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
