import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Network, Nft } from "alchemy-sdk";
import { ReactElement, Suspense, useState } from "react";
import { NetworkSelect } from "@/presentation/common/components/NetworkSelect";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { NftPreviews } from "../components/NftPreviews";
import { Box } from "@mui/joy";
import { css } from "@emotion/react";

interface SelectNftStepProps {
  address: string;
  stepNext: (nft: Nft) => void;
}

export const SelectNftStep = ({
  address,
  stepNext,
}: SelectNftStepProps): ReactElement => {
  const [network, setNetwork] = useState<Network>(Network.ETH_MAINNET);

  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 16px;
      `}
    >
      <NetworkSelect network={network} onNetworkChange={setNetwork} />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={AppError}>
            <Suspense fallback={<NftPreviews.Skeleton />}>
              <NftPreviews.Component
                network={network}
                address={address}
                onNext={stepNext}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Box>
  );
};
