import { css } from "@emotion/react";
import { Box, Skeleton, Typography } from "@mui/joy";
import { Nft } from "alchemy-sdk";
import { NftImage } from "./NftImage";
import { forwardRef } from "react";

interface NftPreviewProps {
  nft: Nft;
}
export const NftPreview = ({ nft }: NftPreviewProps) => {
  return (
    <Box css={nftPreviewStyles}>
      <NftImage nft={nft} />
      <Typography typography="h6">{nft.name}</Typography>
    </Box>
  );
};

export const NftPreviewSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Skeleton
      css={[
        nftPreviewStyles,
        css`
          aspect-ratio: 0.9;
        `,
      ]}
      variant={"rectangular"}
      ref={ref}
    />
  );
});

const nftPreviewStyles = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
