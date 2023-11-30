import { ReactElement, useCallback } from "react";
import { pageContentStyles, pagePaddingStyles } from "../common/styles";
import { AppStepper } from "./components/AppStepper";
import { FormProvider } from "react-hook-form";
import { PhotoForm, usePhotoForm } from "./hooks/usePhotoForm";
import { UploadStep } from "./steps/UploadStep";
import { DataStep } from "./steps/DataStep";
import { PromptStep } from "./steps/PromptStep";
import { PromptKey, PromptValue } from "./constants/Prompts";
import { useBlocker } from "react-router-dom";
import { PhotoSteps } from "./constants/Steps";

const useStepMove = (
  currentStep: PhotoSteps,
  setStep: (newStep: PhotoSteps) => void,
) => {
  const stepNext = useCallback(() => {
    const getNextStep = () => {
      switch (currentStep) {
        case "Upload Photo":
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
        case "Upload Photo":
          return "Upload Photo";
        case "QR Data":
          return "Upload Photo";
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

export const PhotoPage = (): ReactElement => {
  const methods = usePhotoForm();

  const onSubmit = (data: PhotoForm) => {
    console.log(data);
  };
  const { handleSubmit, watch, setValue } = methods;
  const currentStep = watch("currentStep");

  const promptKey = watch("promptKey");
  const { stepNext, stepBack } = useStepMove(currentStep, (newStep) => {
    setValue("currentStep", newStep);
  });
  useBlocker(() => {
    if (currentStep == "Upload Photo") {
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
        <AppStepper<PhotoSteps>
          steps={["Upload Photo", "QR Data", "Prompt", "Complete"]}
          currentStep={currentStep}
          setCurrentStep={(newStep) => {
            setValue("currentStep", newStep);
          }}
        />
        {currentStep == "Upload Photo" && (
          <UploadStep
            stepNext={(photo: Blob) => {
              setValue("photo", photo);
              stepNext();
            }}
            defaultValue={watch("photo")}
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
