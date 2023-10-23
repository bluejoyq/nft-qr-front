import { pageContentStyles } from "@/presentation/common/styles";
import { css } from "@emotion/react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Network, Nft } from "alchemy-sdk";
import { ReactElement, useState } from "react";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";
import { getAlchemy } from "@/data/alchemy";
import { NetworkSelect } from "@/presentation/common/components/NetworkSelect";
import { NftImage } from "@/presentation/common/components/NftImage";

interface SelectNftStepProps {
  address: string;
  onNext: () => void;
}
export const SelectNftStep = ({
  address,
  onNext,
}: SelectNftStepProps): ReactElement => {
  const [network, setNetwork] = useState<Network>(Network.ETH_MAINNET);
  const { data, isLoading } = useQuery({
    queryKey: ["nfts", address, network],
    queryFn: async () => {
      if (address == null) return;
      const alchemy = getAlchemy(network);
      return await alchemy.nft.getNftsForOwner(address);
    },
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });
  const { setValue } = useNftQrFormContext();

  return (
    <Box css={pageContentStyles}>
      <Box
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <Typography variant="h4">Select NFT</Typography>
        <NetworkSelect network={network} onNetworkChange={setNetwork} />
      </Box>

      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
          gap: 10px;
        `}
      >
        {isLoading &&
          new Array(9).fill(0).map((_, index) => {
            return (
              <Skeleton
                key={index}
                css={nftPreviewStyles}
                variant={"rectangular"}
              />
            );
          })}
        {data?.ownedNfts.map((nft) => {
          return (
            <NftPreview
              nft={nft}
              key={`${nft.contract.address}/${nft.tokenId}`}
              onClick={() => {
                setValue("nft", nft);
                onNext();
              }}
            />
          );
        })}
      </div>
    </Box>
  );
};

interface NftPreviewProps {
  nft: Nft;
  onClick: () => void;
}
export const NftPreview = ({ nft, onClick }: NftPreviewProps) => {
  return (
    <Button css={nftPreviewStyles} onClick={onClick}>
      <NftImage nft={nft} />
      <Typography>{nft.title}</Typography>
    </Button>
  );
};

const nftPreviewStyles = css`
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
