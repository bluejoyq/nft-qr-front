import { css } from "@emotion/react";
import { Button, Skeleton, Typography } from "@mui/material";
import { Nft } from "alchemy-sdk";
import { NftImage } from "./NftImage";

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

export const NftPreviewSkeleton = () => {
  return <Skeleton css={nftPreviewStyles} variant={"rectangular"} />;
};

const nftPreviewStyles = css`
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
