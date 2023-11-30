import { AppInput } from "@/presentation/common/components/AppInput";
import { Box, FormControl, FormLabel, Typography } from "@mui/joy";
import { ReactElement, useState } from "react";
import { AppButton } from "@/presentation/common/components/AppButton";
import { css } from "@emotion/react";

interface DataStepProps {
  stepNext: (data: string) => void;
  defaulutValue?: string;
}
export const DataStep = ({
  stepNext,
  defaulutValue,
}: DataStepProps): ReactElement => {
  const [qrData, setQrData] = useState<string>(defaulutValue ?? "");
  return (
    <Box css={styles.container}>
      <FormControl css={styles.formContainer}>
        <FormLabel>Label</FormLabel>
        <AppInput
          placeholder="Data encoded in QR"
          variant="soft"
          css={styles.input}
          defaultValue={defaulutValue}
          onChange={(e) => {
            setQrData(e.target.value);
          }}
        />
      </FormControl>
      <AppButton
        onClick={() => {
          stepNext(qrData);
        }}
        css={styles.nextButton}
        disabled={qrData.length == 0}
      >
        <Typography typography={"h3"}>Next</Typography>
      </AppButton>
    </Box>
  );
};
const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,
  formContainer: css`
    width: 100%;
    max-width: 300px;
  `,
  input: css`
    width: 100%;
    max-width: 300px;
  `,
  nextButton: css`
    margin-top: 16px;
    width: 100%;
    max-width: 500px;
    padding: 16px;
  `,
};
