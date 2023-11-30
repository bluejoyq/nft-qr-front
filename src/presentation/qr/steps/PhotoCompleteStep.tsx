import { AppButton } from "@/presentation/common/components/AppButton";
import { usePalette } from "@/presentation/common/hooks/usePalette";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/joy";
import { ReactElement } from "react";

export const PhotoCompleteStep = (): ReactElement => {
  const palette = usePalette();
  return (
    <Box css={styles.container}>
      <AppButton css={styles.nextButton}>
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
    max-width: 500px;
  `,
  input: css`
    width: 100%;
  `,
  nextButton: css`
    margin-top: 16px;
    width: 100%;
    max-width: 500px;
    padding: 16px;
  `,
};
