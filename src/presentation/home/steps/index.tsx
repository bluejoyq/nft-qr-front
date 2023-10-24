import { ReactElement, useEffect, useState } from "react";
import { SelectNftStep } from "./SelectNftStep";
import { GeneratingStep } from "./GeneratingStep";
import { FormProvider, useForm } from "react-hook-form";
import { ResultStep } from "./ResultStep";
import { NftQrForm } from "../hooks/useNftQrFormContext";
import { DataStep } from "./DataStep";
import { usePostQrCode } from "../hooks/usePostQrCode";
import { css } from "@emotion/react";
import { Box, IconButton, Typography } from "@mui/material";
import { pageContentStyles } from "@/presentation/common/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
type Step = "Select Nft" | "Input QR Data" | "Generating" | "Result";
interface StepsProps {
  address: string;
}

export const Steps = ({ address }: StepsProps): ReactElement => {
  const initialStep = "Select Nft";
  const [step, setStep] = useState<Step>(initialStep);
  const methods = useForm<NftQrForm>();
  const { handleSubmit, watch } = methods;
  const { mutate, isPending, data: resultImage } = usePostQrCode();

  useEffect(() => {
    if (resultImage) {
      setStep("Result");
    }
    if (isPending) {
      setStep("Generating");
    }
  }, [isPending, resultImage]);
  const onSubmit = (data: NftQrForm) => {
    mutate(data);
  };
  const nft = watch("nft");
  return (
    <FormProvider {...methods}>
      <Box css={pageContentStyles}>
        <StepsHeader step={step} setStep={setStep} />
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
              setStep("Generating");
              handleSubmit(onSubmit)();
            }}
          />
        )}
        {step == "Generating" && <GeneratingStep />}
        {step == "Result" && resultImage != null && (
          <ResultStep resultImage={resultImage} nft={nft} />
        )}
      </Box>
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
