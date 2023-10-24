import { pageContentStyles } from "@/presentation/common/styles";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Network } from "alchemy-sdk";
import { ReactElement, Suspense, useState } from "react";
import { NetworkSelect } from "@/presentation/common/components/NetworkSelect";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "@/presentation/common/components/AppError";
import { NftPreviews } from "../components/NftPreviews/NftPreviews";
import { NftPreviewsSkeleton } from "../components/NftPreviews/NftPreviews.skeleton";

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
    <Box css={pageContentStyles}>
      <Box
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 4px;
        `}
      >
        <Typography variant="h4">Select NFT</Typography>
        <NetworkSelect network={network} onNetworkChange={setNetwork} />
      </Box>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={AppError}>
            <Suspense fallback={<NftPreviewsSkeleton />}>
              <NftPreviews
                network={network}
                address={address}
                onNext={onNext}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Box>
  );
};
