import { css } from "@emotion/react";
import { Nft } from "alchemy-sdk";
import { ReactElement } from "react";

interface NftImageProps {
  nft: Nft;
}
export const NftImage = ({ nft }: NftImageProps): ReactElement => {
  const imageUrl = nft.image.cachedUrl ?? nft.image.originalUrl;
  return (
    <img
      src={imageUrl}
      alt={nft.name}
      css={css`
        width: 100%;
        max-width: 300px;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 8px;
      `}
    />
  );
};
