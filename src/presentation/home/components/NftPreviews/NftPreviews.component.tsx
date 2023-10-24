import { getAlchemy } from "@/data/alchemy";
import { NftPreview } from "@/presentation/common/components/NftPreview";
import { Box } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Network } from "alchemy-sdk";
import { ReactElement } from "react";
import { useNftQrFormContext } from "../../hooks/useNftQrFormContext";
import { nftPreviewBoxStyles } from "./NftPreviews.styles";

interface NftPreviewsComponentProps {
  network: Network;
  address: string;
  onNext: () => void;
}
const NftPreviewsComponent = ({
  network,
  address,
  onNext,
}: NftPreviewsComponentProps): ReactElement => {
  const { data } = useSuspenseQuery({
    queryKey: ["nfts", address, network],
    queryFn: async () => {
      if (address == null) return;
      const alchemy = getAlchemy(network);
      return await alchemy.nft.getNftsForOwner(address);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const { setValue } = useNftQrFormContext();

  return (
    <Box css={nftPreviewBoxStyles}>
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
    </Box>
  );
};

export default NftPreviewsComponent;
