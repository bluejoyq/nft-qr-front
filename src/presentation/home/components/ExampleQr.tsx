import { css } from "@emotion/react";
import { Box, Slider } from "@mui/joy";
import { ReactElement, useState } from "react";

export const ExampleQr = (): ReactElement => {
  const defaultValue = 0.3;
  const [cover, setCover] = useState(defaultValue);
  return (
    <Box
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        gap: 16px;
        max-width: 400px;
      `}
    >
      <Box css={styles.imageBox}>
        <img src={"bef-sample.png"} css={[styles.exampleImage]} />
        <img
          src={"sample.png"}
          css={[styles.exampleImage, styles.coverWidth(cover)]}
        />
      </Box>
      <Slider
        defaultValue={defaultValue}
        max={1}
        step={0.1}
        onChange={(_, value) => setCover(value as number)}
      />
    </Box>
  );
};

const styles = {
  imageBox: css`
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    height: auto;
    border-radius: 8px;
    overflow: hidden;
  `,
  exampleImage: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  coverWidth: (cover: number) => css`
    mask-image: linear-gradient(
      to right,
      transparent ${cover * 100}%,
      black ${cover * 100}%
    );
  `,
};
