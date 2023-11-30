import { css } from "@emotion/react";
import {
  Stepper,
  Step,
  StepIndicator,
  Typography,
  Theme,
  useTheme,
} from "@mui/joy";
import { ReactElement } from "react";
interface PhotoStepperProps {
  __?: never;
}
export const PhotoStepper = ({ _ }: PhotoStepperProps): ReactElement => {
  const isCurrent = false;
  const theme = useTheme();
  return (
    <Stepper sx={{ width: "100%" }}>
      <Step
        orientation="vertical"
        indicator={<StepIndicator color="primary">1</StepIndicator>}
      >
        <Typography typography="title-lg" css={styles.typo(theme, !isCurrent)}>
          Upload Photo
        </Typography>
      </Step>
      <Step orientation="vertical" indicator={<StepIndicator>2</StepIndicator>}>
        <Typography typography="title-lg" css={styles.typo(theme, isCurrent)}>
          Review
        </Typography>
      </Step>
      <Step orientation="vertical" indicator={<StepIndicator>3</StepIndicator>}>
        <Typography typography="title-lg" css={styles.typo(theme, isCurrent)}>
          Success
        </Typography>
      </Step>
    </Stepper>
  );
};

const styles = {
  typo: (theme: Theme, isCurrent: boolean) => css`
    color: ${isCurrent ? theme.palette.primary[200] : "inherit"};
  `,
};
