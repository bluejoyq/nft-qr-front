import { GetQrHistoriesResponse, getQrHistories } from "@/data/backend";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const useReadQrHistories = () => {
  const queryResult = useSuspenseInfiniteQuery<
    GetQrHistoriesResponse,
    Error,
    InfiniteData<GetQrHistoriesResponse>,
    [string],
    number | undefined
  >({
    queryKey: ["qr_histories"],
    queryFn: async ({ pageParam }) => {
      return await getQrHistories(pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      const next = lastPage?.next;
      if (next == null) {
        return undefined;
      }
      return next;
    },
    retry: false,
  });
  const { fetchNextPage, hasNextPage, isLoading } = queryResult;
  const [sentryRef] = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    loading: isLoading,
    hasNextPage: hasNextPage,
  });

  return {
    ...queryResult,
    sentryRef,
  };
};
