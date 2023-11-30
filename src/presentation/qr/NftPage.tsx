import { ReactElement, useCallback } from "react";
import { FormProvider } from "react-hook-form";

import {
  pageContentStyles,
  pagePaddingStyles,
} from "@/presentation/common/styles";
import { NftSteps } from "./constants/Steps";
import { NftForm, useNftForm } from "./hooks/useNftForm";
import { useBlocker } from "react-router-dom";
import { AppStepper } from "./components/AppStepper";
import { PromptStep } from "./steps/PromptStep";
import { PromptKey, PromptValue } from "./constants/Prompts";
import { DataStep } from "./steps/DataStep";
import { ConnectStep } from "./steps/ConnectStep";
import { SelectNftStep } from "./steps/SelectNftStep";

const useStepMove = (
  currentStep: NftSteps,
  setStep: (newStep: NftSteps) => void,
) => {
  const stepNext = useCallback(() => {
    const getNextStep = () => {
      switch (currentStep) {
        case "Get Address":
          return "Select Nft";
        case "Select Nft":
          return "QR Data";
        case "QR Data":
          return "Prompt";
        case "Prompt":
          return "Complete";
        case "Complete":
          return "Complete";
      }
    };
    setStep(getNextStep());
  }, [currentStep, setStep]);

  const stepBack = useCallback(() => {
    const getPrevStep = () => {
      switch (currentStep) {
        case "Get Address":
          return "Get Address";
        case "Select Nft":
          return "Get Address";
        case "QR Data":
          return "Select Nft";
        case "Prompt":
          return "QR Data";
        case "Complete":
          return "Prompt";
      }
    };

    setStep(getPrevStep());
  }, [currentStep, setStep]);
  return { stepNext, stepBack };
};

export const NftPage = (): ReactElement => {
  const methods = useNftForm();

  const onSubmit = (data: NftForm) => {
    console.log(data);
  };
  const { handleSubmit, watch, setValue } = methods;
  const currentStep = watch("currentStep");
  const promptKey = watch("promptKey");
  const address = watch("address");

  const { stepNext, stepBack } = useStepMove(currentStep, (newStep) => {
    setValue("currentStep", newStep);
  });
  useBlocker(() => {
    if (currentStep == "Get Address") {
      return false;
    }
    stepBack();
    return true;
  });
  return (
    <FormProvider {...methods}>
      <form
        css={[pageContentStyles, pagePaddingStyles]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AppStepper<NftSteps>
          steps={["Get Address", "Select Nft", "QR Data", "Prompt", "Complete"]}
          currentStep={currentStep}
          setCurrentStep={(newStep) => {
            setValue("currentStep", newStep);
          }}
        />
        {currentStep == "Get Address" && (
          <ConnectStep
            stepNext={(address: string) => {
              setValue("address", address);
              stepNext();
            }}
            defaultValue={watch("address")}
          />
        )}
        {currentStep == "Select Nft" && (
          <SelectNftStep
            address={address}
            stepNext={(nft) => {
              setValue("nft", nft);
              stepNext();
            }}
          />
        )}
        {currentStep == "QR Data" && (
          <DataStep
            stepNext={(qrData: string) => {
              setValue("qrData", qrData);
              stepNext();
            }}
            defaulutValue={watch("qrData")}
          />
        )}
        {currentStep == "Prompt" && (
          <PromptStep
            stepNext={(promptKey: PromptKey, promptValue: PromptValue) => {
              setValue("promptKey", promptKey);
              setValue("promptValue", promptValue);
              stepNext();
            }}
            defaultValue={
              promptKey == null
                ? null
                : { key: promptKey, value: watch("promptValue") }
            }
          />
        )}
      </form>
    </FormProvider>
  );
};
