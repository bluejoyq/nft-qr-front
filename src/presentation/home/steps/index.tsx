import { ReactElement, useEffect, useState } from "react";
import { SelectNftStep } from "./SelectNftStep";
import { GeneratingStep } from "./GeneratingStep";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postQRCode } from "@/data/backend";
import { ResultStep } from "./ResultStep";
import { NftQrForm } from "../hooks/useNftQrFormContext";
import { DataStep } from "./DataStep";

type Step = "selectNft" | "qrData" | "generating" | "done";
interface StepsProps {
  address: string;
}

const usePostQrCode = () => {
  return useMutation({
    mutationFn: async (data: NftQrForm) => {
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
      });
      return resultImage;
    },
  });
};

export const Steps = ({ address }: StepsProps): ReactElement => {
  const initialStep = "selectNft";
  const [step, setStep] = useState<Step>(initialStep);
  const methods = useForm<NftQrForm>();
  const { handleSubmit, watch } = methods;
  const { mutate, isLoading, data: resultImage } = usePostQrCode();

  useEffect(() => {
    if (resultImage) {
      setStep("done");
    }
    if (isLoading) {
      setStep("generating");
    }
  }, [isLoading, resultImage]);
  const onSubmit = (data: NftQrForm) => {
    mutate(data);
  };
  const nft = watch("nft");
  return (
    <FormProvider {...methods}>
      {step == "selectNft" && (
        <SelectNftStep
          address={address}
          onNext={() => {
            setStep("qrData");
          }}
        />
      )}
      {step == "qrData" && (
        <DataStep
          onNext={() => {
            setStep("generating");
            handleSubmit(onSubmit)();
          }}
        />
      )}
      {step == "generating" && <GeneratingStep />}
      {step == "done" && resultImage != null && (
        <ResultStep resultImage={resultImage} nft={nft} />
      )}
    </FormProvider>
  );
};
