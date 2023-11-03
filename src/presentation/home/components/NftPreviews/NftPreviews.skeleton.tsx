import { NftPreviewSkeleton } from "@/presentation/common/components/NftPreview";
import { Box } from "@mui/joy";
import { ReactElement } from "react";
import { nftPreviewBoxStyles } from "./NftPreviews.styles";

const NftPreviewsSkeleton = (): ReactElement => {
  return (
    <Box css={nftPreviewBoxStyles}>
      {new Array(9).fill(0).map((_, index) => (
        <NftPreviewSkeleton key={index} />
      ))}
    </Box>
  );
};

export default NftPreviewsSkeleton;
