import { useMemo, useCallback } from "react";
import { usePhotoFormContext } from "./usePhotoForm";

export const useStepNext = () => {
  const { getValues, setValue } = usePhotoFormContext();
  const { currentStep } = getValues();
  const nextStep = useMemo(() => {
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
  }, [currentStep]);
  const stepNext = useCallback(() => {
    setValue("currentStep", nextStep);
  }, [nextStep, setValue]);
  return { stepNext };
};
