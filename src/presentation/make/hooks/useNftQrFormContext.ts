import { Nft } from "alchemy-sdk";
import { useFormContext } from "react-hook-form";

export const useNftQrFormContext = () => {
  return useFormContext<NftQrForm>();
};

export interface NftQrForm {
  nft: Nft;
  qrData: string;
  address: string;
}
