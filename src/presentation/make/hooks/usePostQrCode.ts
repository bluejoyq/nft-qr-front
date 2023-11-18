import { getHealth, postQRCode } from "@/data/backend";
import { useMutation } from "@tanstack/react-query";
import { NftQrForm } from "./useNftQrFormContext";

export const usePostQrCode = () => {
  return useMutation({
    mutationFn: async (data: NftQrForm) => {
      await getHealth();
      const imageUrl = data.nft.rawMetadata?.image?.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
      if (imageUrl == null) {
        throw new Error("NFT does not have metadata");
      }
      const resultImage = await postQRCode({
        imageUrl,
        qrData: data.qrData,
        addtionalPrompt: data.addtionalPrompt
          ? data.addtionalPrompt
          : undefined,
        contractAddress: data.nft.contract.address,
        tokenId: data.nft.tokenId,
        address: data.address,
      });
      return resultImage;
    },
  });
};
