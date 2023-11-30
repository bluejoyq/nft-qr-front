import { PostQRCodeWithPhotoProps } from "@/data/backend";
import { useForm, useFormContext } from "react-hook-form";
import { PhotoSteps } from "../constants/Steps";
import { CustomKey, CustomValue } from "../constants/Custom";

export interface PhotoForm extends PostQRCodeWithPhotoProps {
  currentStep: PhotoSteps;
  blob: Blob | null;
  customKey: CustomKey | null;
  customValue: CustomValue | "";
}
export const usePhotoForm = () => {
  return useForm<PhotoForm>({
    defaultValues: {
      currentStep: "Upload Photo",
      blob: null,
      qrData: "",
      customValue: "",
      customKey: null,
    },
  });
};

export const usePhotoFormContext = () => {
  return useFormContext<PhotoForm>();
};
