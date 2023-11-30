import { NftSteps } from "../constants/Steps";
import { Custom } from "../constants/Custom";
import { useForm, useFormContext } from "react-hook-form";
import { Nft } from "alchemy-sdk";

export interface NftForm {
  currentStep: NftSteps;
  blob: Blob | null;
  custom: Custom | null;

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
      custom: null,
      nft: null,
    },
  });
};

export const useNftFormContext = () => {
  return useFormContext<NftForm>();
};
