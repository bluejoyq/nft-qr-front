import { PostQRCodeWithPhotoProps } from "@/data/backend";
import { useForm, useFormContext } from "react-hook-form";
import { PhotoSteps } from "../constants/Steps";
import { PromptKey, PromptValue } from "../constants/Prompts";

export interface PhotoForm extends PostQRCodeWithPhotoProps {
  currentStep: PhotoSteps;
  blob: Blob | null;
  promptKey: PromptKey | null;
  promptValue: PromptValue | "";
}
export const usePhotoForm = () => {
  return useForm<PhotoForm>({
    defaultValues: {
      currentStep: "Upload Photo",
      blob: null,
      qrData: "",
      promptValue: "",
      promptKey: null,
    },
  });
};

export const usePhotoFormContext = () => {
  return useFormContext<PhotoForm>();
};
