import { css } from "@emotion/react";
import {
  Stepper,
  Step,
  StepIndicator,
  Typography,
  Palette,
  Button,
} from "@mui/joy";
import { ReactElement } from "react";
import { usePalette } from "@/presentation/common/hooks/usePalette";
import { mq } from "@/presentation/common/constants/mq";
interface AppStepperProps<T> {
  steps: T[];
  currentStep: T;
  setCurrentStep: (step: T) => void;
}
export const AppStepper = <T,>({
  steps,
  currentStep,
  setCurrentStep,
}: AppStepperProps<T>): ReactElement => {
  return (
    <Stepper css={styles.stepper}>
      {steps.map((step, idx) => (
        <AppStep
          key={step as string}
          title={step as string}
          idx={idx}
          isCurrent={step === currentStep}
          onClick={() => {
            setCurrentStep(step);
          }}
          isComplete={idx < steps.indexOf(currentStep)}
        />
      ))}
    </Stepper>
  );
};

interface PhotoStepProps {
  isCurrent: boolean;
  title: string;
  idx: number;
  onClick: () => void;
  isComplete: boolean;
}
const AppStep = ({
  title,
  idx,
  isCurrent,
  onClick,
  isComplete,
}: PhotoStepProps) => {
  const palette = usePalette();

  return (
    <Button
      variant="plain"
      onClick={onClick}
      css={styles.btn}
      disabled={!isComplete}
    >
      <Step
        orientation="vertical"
        indicator={
          <StepIndicator color={isCurrent ? "primary" : "neutral"}>
            {idx + 1}
          </StepIndicator>
        }
      >
        <Typography typography="title-lg" css={styles.typo(palette, isCurrent)}>
          {title}
        </Typography>
      </Step>
    </Button>
  );
};

const styles = {
  typo: (palette: Palette, isCurrent: boolean) => css`
    color: ${isCurrent ? palette.primary[200] : palette.neutral[400]};
    display: none;
    ${mq.wide} {
      display: block;
    }
  `,
  btn: css`
    border-radius: 8px;
    flex: 1;
  `,
  stepper: css`
    width: 100%;
  `,
};
