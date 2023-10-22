import { ReactElement, useEffect, useRef, useState } from "react";
import { SelectNftStep } from "./SelectNftStep";
import { GeneratingStep } from "./GeneratingStep";
import { Nft } from "alchemy-sdk";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, css } from "@mui/material";
import { pageContentStyles } from "@/presentation/common/styles";
import { useMutation } from "@tanstack/react-query";
import { postQRCode } from "@/data/backend";
import { ResultStep } from "./ResultStep";

type Step = "selectNft" | "data" | "generating" | "done";
interface StepsProps {
  address: string;
}

const usePostQrCode = () => {
  return useMutation({
    mutationFn: async (data: NftQrForm) => {
      const resultImage = await postQRCode(data);
      return resultImage;
    },
  });
};

interface NftQrForm {
  nft: Nft;
  data: string;
}
export const Steps = ({ address }: StepsProps): ReactElement => {
  const initialStep = "selectNft";
  const [step, setStep] = useState<Step>(initialStep);
  const { handleSubmit, setValue, watch } = useForm<NftQrForm>();

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
    <>
      {step == "selectNft" && (
        <SelectNftStep
          address={address}
          onNext={(nft) => {
            setValue("nft", nft);
            setStep("data");
          }}
        />
      )}
      {step == "data" && (
        <DataStep
          onNext={(data) => {
            setValue("data", data);
            setStep("generating");
            handleSubmit(onSubmit)();
          }}
        />
      )}
      {step == "generating" && <GeneratingStep />}
      {step == "done" && resultImage != null && (
        <ResultStep resultImage={resultImage} nft={nft} />
      )}
    </>
  );
};

interface DataStepProps {
  onNext: (data: string) => void;
}
const DataStep = ({ onNext }: DataStepProps): ReactElement => {
  const ref = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    if (ref.current == null) {
      return;
    }
    onNext(ref.current.value);
  };
  return (
    <Box css={pageContentStyles}>
      <Typography variant="h4">Input QR Data</Typography>
      <Box css={dataContainerStyles}>
        <TextField
          inputProps={{
            maxLength: 50,
          }}
          ref={ref}
          label="Data"
          placeholder="Enter data to be encoded in QR code"
        />
        <Button variant="contained" onClick={onButtonClick}>
          <Typography>Next</Typography>
        </Button>
      </Box>
    </Box>
  );
};
const dataContainerStyles = css`
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 10px;
`;
