import { alchemy } from "@/data/alchemy";
import { pageContentStyles } from "@/presentation/common/styles";
import { css } from "@emotion/react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Nft } from "alchemy-sdk";
import { ReactElement } from "react";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";

interface SelectNftStepProps {
  address: string;
  onNext: () => void;
}
export const SelectNftStep = ({
  address,
  onNext,
}: SelectNftStepProps): ReactElement => {
  const { data, isLoading } = useQuery({
    queryKey: ["nfts", address],
    queryFn: async () => {
      if (address == null) return;
      return await alchemy.nft.getNftsForOwner(address);
    },
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });
  const { setValue } = useNftQrFormContext();

  return (
    <Box css={pageContentStyles}>
      <Typography variant="h4">Select NFT</Typography>
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
      <img
        src={nft.rawMetadata?.image}
        alt={nft.title}
        css={css`
          width: 100%;
          height: 100%;
          object-fit: c;
        `}
      />
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
