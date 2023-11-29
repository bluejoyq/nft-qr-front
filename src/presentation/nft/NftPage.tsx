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
import { StyleStep } from "./steps/StyleStep";
import { css } from "@emotion/react";
export type Step =
  | "Get Address"
  | "Select Nft"
  | "QR Data"
  | "Style"
  | "Result";

export const NftPage = (): ReactElement => {
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
      <Box css={[pageContentStyles, pagePaddingStyles]}>
        <Box position="static">
          <MakePageHeader step={step} setStep={setStep} />
        </Box>
        <form
          css={css`
            width: 100%;
            height: 100%;
          `}
        >
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
                setStep("QR Data");
              }}
            />
          )}
          {step == "QR Data" && (
            <DataStep
              onNext={() => {
                setStep("Style");
              }}
            />
          )}
          {step == "Style" && (
            <StyleStep
              onNext={() => {
                setStep("Result");
              }}
            />
          )}
          {step == "Result" && <ResultStep handleReset={handleReset} />}
        </form>
      </Box>
    </FormProvider>
  );
};
