import { PostQRCodeWithPhotoProps } from "@/data/backend";
import { useForm, useFormContext } from "react-hook-form";
import { PhotoSteps } from "../constants/Steps";
import { Custom } from "../constants/Custom";

export interface PhotoForm extends PostQRCodeWithPhotoProps {
  currentStep: PhotoSteps;
  blob: Blob | null;
  custom: Custom | null;
}
export const usePhotoForm = () => {
  return useForm<PhotoForm>({
    defaultValues: {
      currentStep: "Upload Photo",
      blob: null,
      qrData: "",
      custom: null,
    },
  });
};

export const usePhotoFormContext = () => {
  return useFormContext<PhotoForm>();
};
