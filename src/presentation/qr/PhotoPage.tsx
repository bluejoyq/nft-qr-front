import { ReactElement, useCallback } from "react";
import { pageContentStyles, pagePaddingStyles } from "../common/styles";
import { AppStepper } from "./components/AppStepper";
import { FormProvider } from "react-hook-form";
import { PhotoForm, usePhotoForm } from "./hooks/usePhotoForm";
import { UploadStep } from "./steps/UploadStep";
import { DataStep } from "./steps/DataStep";
import { CustomStep } from "./steps/CustomStep";
import { CustomKey, CustomValue } from "./constants/Custom";
import { useBlocker } from "react-router-dom";
import { PhotoSteps } from "./constants/Steps";
import { PhotoCompleteStep } from "./steps/PhotoCompleteStep";

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
        case "Upload Photo":
          return "Upload Photo";
        case "QR Data":
          return "Upload Photo";
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

export const PhotoPage = (): ReactElement => {
  const methods = usePhotoForm();

  const onSubmit = (data: PhotoForm) => {
    console.log(data);
  };
  const { handleSubmit, watch, setValue } = methods;
  const currentStep = watch("currentStep");

  const customKey = watch("customKey");
  const { stepNext, stepBack } = useStepMove(currentStep, (newStep) => {
    setValue("currentStep", newStep);
  });
  useBlocker((blockData) => {
    if (blockData.historyAction != "POP") {
      return false;
    }
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
          steps={["Upload Photo", "QR Data", "Custom", "Complete"]}
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
        {currentStep == "Complete" && <PhotoCompleteStep />}
      </form>
    </FormProvider>
  );
};
