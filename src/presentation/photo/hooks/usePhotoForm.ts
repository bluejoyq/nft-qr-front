import { PostQRCodeWithPhotoProps } from "@/data/backend";
import { useForm, useFormContext } from "react-hook-form";
import { PhotoSteps } from "../constants/PhotoStep";

export interface PhotoForm extends PostQRCodeWithPhotoProps {
  currentStep: PhotoSteps;
  blob: Blob | null;
}
export const usePhotoForm = () => {
  return useForm<PhotoForm>({
    defaultValues: {
      currentStep: "Upload Photo",
      blob: null,
    },
  });
};

export const usePhotoFormContext = () => {
  return useFormContext<PhotoForm>();
};
