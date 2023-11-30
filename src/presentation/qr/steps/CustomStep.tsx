import { AppButton } from "@/presentation/common/components/AppButton";
import { css } from "@emotion/react";
import { Box, Option, Palette, Select, Typography } from "@mui/joy";
import { ReactElement, useState } from "react";
import {
  CustomKey,
  CustomValue,
  customExamplePhotos,
  customOptions,
} from "../constants/Custom";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { usePalette } from "@/presentation/common/hooks/usePalette";
interface Custom {
  key: CustomKey;
  value: CustomValue;
}
interface CustomStepProps {
  stepNext: (customKey: CustomKey, customValue: CustomValue) => void;
  defaultValue: Custom | null;
}
export const CustomStep = ({
  stepNext,
  defaultValue,
}: CustomStepProps): ReactElement => {
  const palette = usePalette();
  const [custom, setcustom] = useState<Custom | null>(defaultValue ?? null);
  return (
    <Box css={styles.container}>
      <Typography typography={"h3"}>Add custom</Typography>
      <CustomSelector
        onChange={(newcustom) => {
          setcustom(newcustom);
        }}
        defaultValue={defaultValue?.key}
      />
      {custom == null ? (
        <Box css={styles.examplePhoto(palette)}>
          <DrawOutlinedIcon />
          <Typography typography={"h3"}>No custom</Typography>
        </Box>
      ) : (
        <img
          src={customExamplePhotos[custom.key]}
          css={styles.examplePhoto(palette)}
        />
      )}
      <AppButton
        onClick={() => {
          if (custom == null) {
            return;
          }
          stepNext(custom.key, custom.value);
        }}
        css={styles.nextButton}
        disabled={custom == null}
      >
        <Typography typography={"h3"}>Next</Typography>
      </AppButton>
    </Box>
  );
};

interface CustomSelectorProps {
  onChange: (customKey: Custom | null) => void;
  defaultValue?: CustomKey;
}
const CustomSelector = ({ onChange, defaultValue }: CustomSelectorProps) => {
  return (
    <Select
      onChange={(_, key) => {
        if (key == null) {
          onChange(null);
          return;
        }
        const customKey = key as CustomKey;

        onChange({
          key: customKey,
          value: customOptions[customKey],
        });
      }}
      defaultValue={defaultValue}
    >
      <Option value={null}>no custom</Option>
      {Object.keys(customOptions).map((key) => (
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
