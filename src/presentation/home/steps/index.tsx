import { ReactElement, useState } from "react";
import { SelectNftStep } from "./SelectNftStep";
import { FormProvider, useForm } from "react-hook-form";
import { ResultStep } from "./ResultStep";
import { NftQrForm } from "../hooks/useNftQrFormContext";
import { DataStep } from "./DataStep";
import { css } from "@emotion/react";
import {
  pageContentStyles,
  pagePaddingStyles,
} from "@/presentation/common/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ConnectStep } from "./ConnectStep";
import { Box, IconButton, Link, Typography } from "@mui/joy";
export type Step = "Get Address" | "Select Nft" | "Input QR Data" | "Result";

export const Steps = (): ReactElement => {
  const initialStep = "Get Address";
  const [step, setStep] = useState<Step>(initialStep);
  const methods = useForm<NftQrForm>();

  const handleReset = () => {
    methods.reset();
    setStep(initialStep);
  };

  const address = methods.watch("address");
  return (
    <FormProvider {...methods}>
      <Box position="static" css={pagePaddingStyles}>
        <StepsHeader step={step} setStep={setStep} />
      </Box>
      <form css={pageContentStyles}>
        {step == "Get Address" && (
          <ConnectStep
            onNext={(address) => {
              methods.setValue("address", address);
              setStep("Select Nft");
            }}
          />
        )}
        {step == "Select Nft" && (
          <SelectNftStep
            address={address}
            onNext={() => {
              setStep("Input QR Data");
            }}
          />
        )}
        {step == "Input QR Data" && (
          <DataStep
            onNext={() => {
              setStep("Result");
            }}
          />
        )}
        {step == "Result" && <ResultStep handleReset={handleReset} />}
      </form>
      <StepsFooter />
    </FormProvider>
  );
};

const StepsHeader = ({
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

  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      `}
    >
      <Typography typography="h2">NFT QR Generator</Typography>
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
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
                    ? "red"
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
            typography="h4"
            css={css`
              width: 100%;
            `}
          >
            step: {currentStepIndex + 1}.{step}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const StepsFooter = () => {
  return (
    <Box
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      `}
    >
      <Typography typography="h6">
        This service does not require any paid goods or tokens.
      </Typography>
      <Link href="https://github.com/bluejoyq">Developer Github</Link>
    </Box>
  );
};
