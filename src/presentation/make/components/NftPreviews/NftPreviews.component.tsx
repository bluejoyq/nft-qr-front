import { getAlchemy } from "@/data/alchemy";
import { NftPreview } from "@/presentation/common/components/NftPreview";
import { Box, Button } from "@mui/joy";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Network } from "alchemy-sdk";
import { ReactElement } from "react";
import { useNftQrFormContext } from "../../hooks/useNftQrFormContext";
import { nftPreviewBoxStyles } from "./NftPreviews.styles";
import { css } from "@emotion/react";

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
          <Button
            onClick={() => {
              setValue("nft", nft);
              onNext();
            }}
            variant="plain"
            key={`${nft.contract.address}/${nft.tokenId}`}
            css={css`
              border-radius: 8px;
              padding: 8px;
            `}
          >
            <NftPreview nft={nft} />
          </Button>
        );
      })}
    </Box>
  );
};

export default NftPreviewsComponent;
