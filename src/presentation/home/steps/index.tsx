import { ReactElement, useEffect, useState } from "react";
import { SelectNftStep } from "./SelectNftStep";
import { GeneratingStep } from "./GeneratingStep";
import { FormProvider, useForm } from "react-hook-form";
import { ResultStep } from "./ResultStep";
import { NftQrForm } from "../hooks/useNftQrFormContext";
import { DataStep } from "./DataStep";
import { usePostQrCode } from "../hooks/usePostQrCode";

type Step = "selectNft" | "qrData" | "generating" | "done";
interface StepsProps {
  address: string;
}

export const Steps = ({ address }: StepsProps): ReactElement => {
  const initialStep = "selectNft";
  const [step, setStep] = useState<Step>(initialStep);
  const methods = useForm<NftQrForm>();
  const { handleSubmit, watch } = methods;
  const { mutate, isPending, data: resultImage } = usePostQrCode();

  useEffect(() => {
    if (resultImage) {
      setStep("done");
    }
    if (isPending) {
      setStep("generating");
    }
  }, [isPending, resultImage]);
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
