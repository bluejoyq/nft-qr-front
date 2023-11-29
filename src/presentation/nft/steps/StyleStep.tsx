import { AppButton } from "@/presentation/common/components/AppButton";
import { Flex } from "@/presentation/common/components/Flex";
import { css } from "@emotion/react";
import { Box, Option, Select } from "@mui/joy";
import { useNftQrFormContext } from "../hooks/useNftQrFormContext";

interface StyleStepProps {
  onNext: () => void;
}

export const StyleStep = ({ onNext }: StyleStepProps) => {
  const { setValue } = useNftQrFormContext();
  const styleOptions = {
    realistic: "realistic:2.0",
    anime: "anime:2.0",
    photographic: "photographic:2.0",
    sketch: "sketch:2.0",
    painting: "painting:2.0",
    cartoon: "cartoon:2.0",
    vector: "vector:2.0",
    abstract: "abstract:2.0",
    artistic: "artistic:2.0",
  };
  const handleSelectChange = (
    _: any,
    val: keyof typeof styleOptions | null
  ) => {
    if (val == null) {
      return;
    }
    setValue("additionalPrompt", styleOptions[val]);
  };
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        align-items: center;
        height: 100%;
        gap: 16px;
      `}
    >
      <Flex />
      <Select onChange={handleSelectChange} placeholder="Addtional Style">
        {Object.keys(styleOptions).map((key) => (
          <Option value={key} key={key}>
            {key}
          </Option>
        ))}
      </Select>
      <Flex />
      <AppButton onClick={onNext}>Next</AppButton>
    </Box>
  );
};
