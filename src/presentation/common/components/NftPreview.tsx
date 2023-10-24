import { css } from "@emotion/react";
import { Box, Skeleton, Typography } from "@mui/material";
import { Nft } from "alchemy-sdk";
import { NftImage } from "./NftImage";

interface NftPreviewProps {
  nft: Nft;
}
export const NftPreview = ({ nft }: NftPreviewProps) => {
  return (
    <Box css={nftPreviewStyles}>
      <NftImage nft={nft} />
      <Typography variant="h6">{nft.title}</Typography>
    </Box>
  );
};

export const NftPreviewSkeleton = () => {
  return <Skeleton css={nftPreviewStyles} variant={"rectangular"} />;
};

const nftPreviewStyles = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
