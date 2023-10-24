import { css } from "@emotion/react";
import { Nft } from "alchemy-sdk";
import { ReactElement } from "react";

interface NftImageProps {
  nft: Nft;
}
export const NftImage = ({ nft }: NftImageProps): ReactElement => {
  const imageUrl = nft.rawMetadata?.image?.replace(
    "ipfs://",
    "https://ipfs.io/ipfs/"
  );
  return (
    <img
      src={imageUrl}
      alt={nft.title}
      css={css`
        width: 100%;
        max-width: 300px;
        aspect-ratio: 1;
        object-fit: cover;
      `}
    />
  );
};
