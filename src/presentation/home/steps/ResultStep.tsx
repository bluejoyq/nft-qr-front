import { NftImage } from "@/presentation/common/components/NftImage";
import { pageContentStyles } from "@/presentation/common/styles";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Nft } from "alchemy-sdk";
import { ReactElement } from "react";

interface ResultStepProps {
  resultImage: Blob;
  nft: Nft;
}
export const ResultStep = ({
  resultImage,
  nft,
}: ResultStepProps): ReactElement => {
  return (
    <Box css={pageContentStyles}>
      <img
        src={URL.createObjectURL(resultImage)}
        css={css`
          width: 100%;
          aspect-ratio: 1;
        `}
      />

      <Typography variant="h6">{nft.rawMetadata?.name}</Typography>
      <NftImage nft={nft} />
    </Box>
  );
};
