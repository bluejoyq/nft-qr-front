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
import { CustomStep } from "./steps/CustomStep";
import { CustomKey, CustomValue } from "./constants/Custom";
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
          return "Custom";
        case "Custom":
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
        case "Custom":
          return "QR Data";
        case "Complete":
          return "Custom";
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
  const customKey = watch("customKey");
  const address = watch("address");

  const { stepNext, stepBack } = useStepMove(currentStep, (newStep) => {
    setValue("currentStep", newStep);
  });
  useBlocker((blockData) => {
    if (blockData.historyAction != "POP") {
      return false;
    }
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
          steps={["Get Address", "Select Nft", "QR Data", "Custom", "Complete"]}
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
        {currentStep == "Custom" && (
          <CustomStep
            stepNext={(customKey: CustomKey, customValue: CustomValue) => {
              setValue("customKey", customKey);
              setValue("customValue", customValue);
              stepNext();
            }}
            defaultValue={
              customKey == null
                ? null
                : { key: customKey, value: watch("customValue") }
            }
          />
        )}
      </form>
    </FormProvider>
  );
};
