import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Network } from "alchemy-sdk";
import { ReactElement, Suspense, useState } from "react";
import { NetworkSelect } from "@/presentation/common/components/NetworkSelect";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { NftPreviews } from "../components/NftPreviews";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/data/firebase";

interface SelectNftStepProps {
  address: string;
  onNext: () => void;
}

export const SelectNftStep = ({
  address,
  onNext,
}: SelectNftStepProps): ReactElement => {
  const [network, setNetwork] = useState<Network>(Network.ETH_MAINNET);

  return (
    <>
      <NetworkSelect network={network} onNetworkChange={setNetwork} />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={AppError}>
            <Suspense fallback={<NftPreviews.Skeleton />}>
              <NftPreviews.Component
                network={network}
                address={address}
                onNext={() => {
                  onNext();
                  logEvent(analytics, "selectNft");
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};
