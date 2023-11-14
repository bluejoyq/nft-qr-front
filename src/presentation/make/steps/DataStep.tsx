import { css } from "@emotion/react";
import { Box, Typography, Button, Input } from "@mui/joy";
import { ReactElement } from "react";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";
import { NftPreview } from "@/presentation/common/components/NftPreview";

interface DataStepProps {
  onNext: () => void;
}
export const DataStep = ({ onNext }: DataStepProps): ReactElement => {
  const { register, watch } = useNftQrFormContext();
  const nft = watch("nft");
  return (
    <>
      <NftPreview nft={nft} />
      <Box css={dataContainerStyles}>
        <Input
          maxLength={50}
          placeholder="Enter data to be encoded in QR code"
          {...register("qrData", {
            required: true,
            maxLength: 50,
          })}
        />
        <Button onClick={onNext}>
          <Typography>Next</Typography>
        </Button>
      </Box>
    </>
  );
};
const dataContainerStyles = css`
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 10px;
`;
