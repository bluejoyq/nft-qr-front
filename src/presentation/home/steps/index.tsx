import { ReactElement, useState } from "react";
import { SelectNftStep } from "./SelectNftStep";
import { FormProvider, useForm } from "react-hook-form";
import { ResultStep } from "./ResultStep";
import { NftQrForm } from "../hooks/useNftQrFormContext";
import { DataStep } from "./DataStep";
import { css } from "@emotion/react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { pageContentStyles } from "@/presentation/common/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ConnectStep } from "./ConnectStep";
import { NftConnector } from "../components/NftConnector";
type Step = "Get Address" | "Select Nft" | "Input QR Data" | "Result";

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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NFT QR Code Generator
          </Typography>
          <NftConnector address={address} />
        </Toolbar>
      </AppBar>
      <form>
        <Box css={pageContentStyles}>
          <StepsHeader step={step} setStep={setStep} />
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
        </Box>
      </form>
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
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
      `}
    >
      {step === "Input QR Data" && (
        <IconButton onClick={() => setStep("Select Nft")}>
          <ArrowBackIosIcon />
        </IconButton>
      )}
      <Typography variant="h4">{step}</Typography>
    </Box>
  );
};
