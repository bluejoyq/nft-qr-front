import { css } from "@emotion/react";
import { Box, Typography, IconButton, useTheme } from "@mui/joy";
import { Step } from "../MakePage";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
      case "Input QR Data":
        return 2;
      case "Result":
        return 3;
    }
  };

  const handleBack = () => {
    switch (step) {
      case "Get Address":
        return;
      case "Select Nft":
        return setStep("Get Address");
      case "Input QR Data":
        return setStep("Select Nft");
      case "Result":
        return setStep("Input QR Data");
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
      `}
    >
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <Box
          css={css`
            display: flex;
            width: 100%;
            justify-content: space-around;
          `}
        >
          {new Array(4).fill(0).map((_, index) => {
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
          `}
        >
          {step != "Get Address" && (
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Typography
            typography="h3"
            css={css`
              width: 100%;
            `}
          >
            Step: {currentStepIndex + 1}. {step}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};