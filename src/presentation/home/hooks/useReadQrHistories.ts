import { GetQrHistoriesResponse, getQrHistories } from "@/data/backend";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const useReadQrHistories = () => {
  return useSuspenseInfiniteQuery<
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
};
