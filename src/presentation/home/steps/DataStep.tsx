import { pageContentStyles } from "@/presentation/common/styles";
import { css } from "@emotion/react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { ReactElement } from "react";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";

interface DataStepProps {
  onNext: () => void;
}
export const DataStep = ({ onNext }: DataStepProps): ReactElement => {
  const { register } = useNftQrFormContext();
  return (
    <Box css={pageContentStyles}>
      <Typography variant="h4">Input QR Data</Typography>
      <Box css={dataContainerStyles}>
        <TextField
          inputProps={{
            maxLength: 50,
          }}
          label="QR Data"
          placeholder="Enter data to be encoded in QR code"
          {...register("qrData", {
            required: true,
            maxLength: 50,
          })}
        />
        <Button variant="contained" onClick={onNext}>
          <Typography>Next</Typography>
        </Button>
      </Box>
    </Box>
  );
};
const dataContainerStyles = css`
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 10px;
`;
