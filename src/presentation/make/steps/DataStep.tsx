import { css } from "@emotion/react";
import { Box, Input, Select, Option } from "@mui/joy";
import { ReactElement, useState } from "react";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";
import { NftPreview } from "@/presentation/common/components/NftPreview";
import { AppButton } from "@/presentation/common/components/AppButton";

interface DataStepProps {
  onNext: () => void;
}
export const DataStep = ({ onNext }: DataStepProps): ReactElement => {
  const { register, watch, setValue } = useNftQrFormContext();
  const nft = watch("nft");
  const address = watch("address");
  const [readOnly, setReadOnly] = useState(false);

  const handleSelectChange = (
    _: any,
    val: "address" | "addressUrl" | "nftUrl" | "free" | null
  ) => {
    if (val == "free" || val == null) {
      setReadOnly(false);
      return;
    }
    setReadOnly(true);
    switch (val) {
      case "address":
        setValue("qrData", address);
        break;
      case "addressUrl":
        setValue("qrData", `https://opensea.io/${address}`);
        break;
      case "nftUrl":
        setValue(
          "qrData",
          `https://opensea.io/assets/${nft?.contract.address}/${nft?.tokenId}`
        );
        break;
    }
  };
  return (
    <Box css={styles.container}>
      <NftPreview nft={nft} />
      <Select
        placeholder="Recommended Data"
        css={styles.select}
        onChange={handleSelectChange}
      >
        <Option value="address">Address</Option>
        <Option value="addressUrl">OpenSea Address URL</Option>
        <Option value="nftUrl">OpenSea NFT URL</Option>
        <Option value="free">Free</Option>
      </Select>
      <Box css={styles.dataContainer}>
        <Input
          maxLength={50}
          placeholder="Enter data to be encoded in QR code"
          readOnly={readOnly}
          {...register("qrData", {
            required: true,
            maxLength: 50,
          })}
        />
        <AppButton onClick={onNext}>Next</AppButton>
      </Box>
    </Box>
  );
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,
  select: css`
    width: 300px;
  `,
  dataContainer: css`
    display: grid;
    grid-template-columns: 4fr 1fr;
    column-gap: 10px;
    width: 100%;
  `,
};
