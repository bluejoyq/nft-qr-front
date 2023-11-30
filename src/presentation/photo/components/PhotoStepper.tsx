import { css } from "@emotion/react";
import { Stepper, Step, StepIndicator, Typography, Palette } from "@mui/joy";
import { ReactElement } from "react";
import { usePhotoFormContext } from "../hooks/usePhotoForm";
import { usePalette } from "@/presentation/common/hooks/usePalette";
import { PhotoSteps } from "../constants/PhotoStep";

export const PhotoStepper = (): ReactElement => {
  const steps: PhotoSteps[] = ["Upload Photo", "QR Data", "Prompt", "Complete"];
  const { watch } = usePhotoFormContext();
  const currentStep = watch("currentStep");
  return (
    <Stepper sx={{ width: "100%" }}>
      {steps.map((step, idx) => (
        <PhotoStep
          key={step}
          title={step}
          idx={idx}
          isCurrent={step === currentStep}
        />
      ))}
    </Stepper>
  );
};

interface PhotoStepProps {
  isCurrent: boolean;
  title: string;
  idx: number;
}
const PhotoStep = ({ title, idx, isCurrent }: PhotoStepProps) => {
  const palette = usePalette();
  return (
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
  );
};

const styles = {
  typo: (palette: Palette, isCurrent: boolean) => css`
    color: ${isCurrent ? palette.primary[200] : "inherit"};
  `,
};
