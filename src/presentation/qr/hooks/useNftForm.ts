import { NftSteps } from "../constants/Steps";
import { CustomKey, CustomValue } from "../constants/Custom";
import { useForm, useFormContext } from "react-hook-form";
import { Nft } from "alchemy-sdk";

export interface NftForm {
  currentStep: NftSteps;
  blob: Blob | null;
  customKey: CustomKey | null;
  customValue: CustomValue | "";
  nft: Nft | null;
  qrData: string;
  address: string;
}
export const useNftForm = () => {
  return useForm<NftForm>({
    defaultValues: {
      currentStep: "Get Address",
      blob: null,
      qrData: "",
      customValue: "",
      customKey: null,
      nft: null,
    },
  });
};

export const usePhotoFormContext = () => {
  return useFormContext<NftForm>();
};
