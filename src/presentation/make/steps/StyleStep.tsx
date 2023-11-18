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
  const handleSelectChange = (_: any, val: "realistic" | "static" | null) => {
    setValue("addtionalPrompt", val);
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
      <Select onChange={handleSelectChange} placeholder="Addtional Style">
        <Option value={"realistic"}>Realistic</Option>
        <Option value={"anime"}>Anime</Option>
      </Select>
      <Flex />
      <AppButton onClick={onNext}>Next</AppButton>
    </Box>
  );
};
