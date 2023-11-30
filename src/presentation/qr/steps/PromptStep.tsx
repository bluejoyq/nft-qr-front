import { AppButton } from "@/presentation/common/components/AppButton";
import { css } from "@emotion/react";
import { Box, Option, Select, Typography } from "@mui/joy";
import { ReactElement, useState } from "react";
import { PromptKey, PromptValue, promptOptions } from "../constants/Prompts";

interface Prompt {
  key: PromptKey;
  value: PromptValue;
}
interface PromptStepProps {
  stepNext: (promptKey: PromptKey, promptValue: PromptValue) => void;
  defaultValue: Prompt | null;
}
export const PromptStep = ({
  stepNext,
  defaultValue,
}: PromptStepProps): ReactElement => {
  const [prompt, setPrompt] = useState<Prompt | null>(defaultValue ?? null);
  return (
    <Box css={styles.container}>
      <PropmtSelector
        onChange={(key, value) => {
          setPrompt({ key, value });
        }}
        defaultValue={defaultValue?.key}
      />
      <AppButton
        onClick={() => {
          if (prompt == null) {
            return;
          }
          stepNext(prompt.key, prompt.value);
        }}
        css={styles.nextButton}
        disabled={prompt == null}
      >
        <Typography typography={"h3"}>Next</Typography>
      </AppButton>
    </Box>
  );
};

interface PromptSelectorProps {
  onChange: (promptKey: PromptKey, promptValu: PromptValue) => void;
  defaultValue?: PromptKey;
}
const PropmtSelector = ({ onChange, defaultValue }: PromptSelectorProps) => {
  return (
    <Select
      onChange={(_, key) => {
        const promptKey = key as PromptKey;
        onChange(promptKey, promptOptions[promptKey]);
      }}
      defaultValue={defaultValue}
    >
      <Option value={null}>-</Option>
      {Object.keys(promptOptions).map((key) => (
        <Option value={key} key={key}>
          {key}
        </Option>
      ))}
    </Select>
  );
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,
  nextButton: css`
    margin-top: 16px;
    width: 100%;
    max-width: 300px;
    padding: 16px;
  `,
};
