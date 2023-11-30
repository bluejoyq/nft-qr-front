import { getAlchemy } from "@/data/alchemy";
import {
  NftPreview,
  NftPreviewSkeleton,
} from "@/presentation/common/components/NftPreview";
import { Alert, Box, Button, Typography } from "@mui/joy";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Network, Nft, OwnedNftsResponse } from "alchemy-sdk";
import { ReactElement } from "react";
import { nftPreviewBoxStyles } from "./NftPreviews.styles";
import { css } from "@emotion/react";
import useInfiniteScroll from "react-infinite-scroll-hook";

const useLoadNfts = (network: Network, address: string) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<
      OwnedNftsResponse,
      Error,
      InfiniteData<OwnedNftsResponse>,
      [string, string, Network],
      string | undefined
    >({
      queryKey: ["nfts", address, network],
      queryFn: async ({ pageParam }) => {
        const alchemy = getAlchemy(network);
        const res = await alchemy.nft.getNftsForOwner(address, {
          pageKey: pageParam,
        });
        return {
          ...res,
          ownedNfts: res.ownedNfts.filter(
            (nft) =>
              nft.image.contentType?.includes("image") && nft.name != null,
          ),
        };
      },
      initialPageParam: undefined,
      staleTime: 1000 * 60 * 5, // 5 minutes
      getNextPageParam: (lastPage) => {
        const pageKey = lastPage?.pageKey;
        return pageKey;
      },
    });

  const [sentryRef] = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    loading: isLoading,
    hasNextPage: hasNextPage,
  });

  return {
    data: data?.pages.map((page) => page.ownedNfts).flat(),
    sentryRef,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  };
};
interface NftPreviewsComponentProps {
  network: Network;
  address: string;
  onNext: (nft: Nft) => void;
}
const NftPreviewsComponent = ({
  network,
  address,
  onNext,
}: NftPreviewsComponentProps): ReactElement => {
  const { data, sentryRef, isLoading, hasNextPage } = useLoadNfts(
    network,
    address,
  );
  if (data.length === 0 && !isLoading) {
    return (
      <Box css={styles.emptyBox}>
        <Alert
          color="warning"
          css={css`
            border-radius: 8px;
          `}
        >
          <Typography typography="h3">
            You don't have any NFTs in your wallet.
            <br />
            Please choose anthor wallet or network.
          </Typography>
        </Alert>
      </Box>
    );
  }
  return (
    <Box css={nftPreviewBoxStyles}>
      {data.map((nft) => {
        return (
          <Button
            onClick={() => {
              onNext(nft);
            }}
            variant="plain"
            key={`${nft.contract.address}/${nft.tokenId}`}
            css={styles.btn}
          >
            <NftPreview nft={nft} />
          </Button>
        );
      })}

      {(isLoading || hasNextPage) && (
        <>
          <NftPreviewSkeleton ref={sentryRef} />
          <NftPreviewSkeleton />
          <NftPreviewSkeleton />
        </>
      )}
    </Box>
  );
};

const styles = {
  btn: css`
    border-radius: 8px;
    padding: 8px;
  `,
  emptyBox: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
  `,
};

export default NftPreviewsComponent;
