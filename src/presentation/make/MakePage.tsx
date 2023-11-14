import { ReactElement, useState } from "react";
import { SelectNftStep } from "./steps/SelectNftStep";
import { FormProvider, useForm } from "react-hook-form";
import { ResultStep } from "./steps/ResultStep";
import { NftQrForm } from "./hooks/useNftQrFormContext";
import { DataStep } from "./steps/DataStep";
import {
  pageContentStyles,
  pagePaddingStyles,
} from "@/presentation/common/styles";
import { ConnectStep } from "./steps/ConnectStep";
import { Box } from "@mui/joy";
import { MakePageHeader } from "./components/MakePageHeader";
export type Step = "Get Address" | "Select Nft" | "Input QR Data" | "Result";

export const MakePage = (): ReactElement => {
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
        <MakePageHeader step={step} setStep={setStep} />
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
    </FormProvider>
  );
};
