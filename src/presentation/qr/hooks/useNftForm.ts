import { NftSteps } from "../constants/Steps";
import { PromptKey, PromptValue } from "../constants/Prompts";
import { useForm, useFormContext } from "react-hook-form";
import { Nft } from "alchemy-sdk";

export interface NftForm {
  currentStep: NftSteps;
  blob: Blob | null;
  promptKey: PromptKey | null;
  promptValue: PromptValue | "";
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
      promptValue: "",
      promptKey: null,
      nft: null,
    },
  });
};

export const usePhotoFormContext = () => {
  return useFormContext<NftForm>();
};
