import { AppButton } from "@/presentation/common/components/AppButton";
import { css } from "@emotion/react";
import { Box, Option, Palette, Select, Typography } from "@mui/joy";
import { ReactElement, useState } from "react";
import {
  PromptKey,
  PromptValue,
  promptExamplePhotos,
  promptOptions,
} from "../constants/Prompts";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { usePalette } from "@/presentation/common/hooks/usePalette";
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
  const palette = usePalette();
  const [prompt, setPrompt] = useState<Prompt | null>(defaultValue ?? null);
  return (
    <Box css={styles.container}>
      <Typography typography={"h3"}>Add custom</Typography>
      <PropmtSelector
        onChange={(newPrompt) => {
          setPrompt(newPrompt);
        }}
        defaultValue={defaultValue?.key}
      />
      {prompt == null ? (
        <Box css={styles.examplePhoto(palette)}>
          <DrawOutlinedIcon />
          <Typography typography={"h3"}>No custom</Typography>
        </Box>
      ) : (
        <img
          src={promptExamplePhotos[prompt.key]}
          css={styles.examplePhoto(palette)}
        />
      )}
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
  onChange: (promptKey: Prompt | null) => void;
  defaultValue?: PromptKey;
}
const PropmtSelector = ({ onChange, defaultValue }: PromptSelectorProps) => {
  return (
    <Select
      onChange={(_, key) => {
        if (key == null) {
          onChange(null);
          return;
        }
        const promptKey = key as PromptKey;

        onChange({
          key: promptKey,
          value: promptOptions[promptKey],
        });
      }}
      defaultValue={defaultValue}
    >
      <Option value={null}>no custom</Option>
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
    max-width: 500px;
    padding: 16px;
  `,
  examplePhoto: (palette: Palette) => css`
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
    svg {
      width: 64px;
      height: 64px;
    }
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    background-color: ${palette.background.level2};
  `,
};
