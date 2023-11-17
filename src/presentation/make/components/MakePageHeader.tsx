import { css } from "@emotion/react";
import { Box, Typography, useTheme } from "@mui/joy";
import { Step } from "../MakePage";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { AppIconButton } from "@/presentation/common/components/AppButton";
export const MakePageHeader = ({
  step,
  setStep,
}: {
  step: Step;
  setStep: (step: Step) => void;
}) => {
  const stepToIndex = (step: Step) => {
    switch (step) {
      case "Get Address":
        return 0;
      case "Select Nft":
        return 1;
      case "QR Data":
        return 2;
      case "Style":
        return 3;
      case "Result":
        return 4;
    }
  };

  const handleBack = () => {
    switch (step) {
      case "Get Address":
        return;
      case "Select Nft":
        return setStep("Get Address");
      case "QR Data":
        return setStep("Select Nft");
      case "Style":
        return setStep("QR Data");
      case "Result":
        return setStep("Style");
    }
  };
  const currentStepIndex = stepToIndex(step);
  const theme = useTheme();
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        width: 100%;
      `}
    >
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        `}
      >
        <Box
          css={css`
            display: flex;
            width: 200px;
            align-items: center;
            justify-content: space-around;
          `}
        >
          {new Array(5).fill(0).map((_, index) => {
            return (
              <div
                css={css`
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background-color: ${index <= currentStepIndex
                    ? theme.palette.primary[400]
                    : "white"};
                `}
              />
            );
          })}
        </Box>
        <Box
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
          `}
        >
          {step != "Get Address" && (
            <AppIconButton onClick={handleBack}>
              <ArrowBackRoundedIcon />
            </AppIconButton>
          )}
          <Typography
            typography="h3"
            css={css`
              width: 100%;
              flex: 1;
              text-align: center;
              padding-right: 40px;
            `}
          >
            Step: {currentStepIndex + 1}. {step}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
