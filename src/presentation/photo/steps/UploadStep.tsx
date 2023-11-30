import { AppButton } from "@/presentation/common/components/AppButton";
import { css } from "@emotion/react";
import { Box, Palette, Typography } from "@mui/joy";
import { ReactElement, useRef } from "react";
import { usePhotoFormContext } from "../hooks/usePhotoForm";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { usePalette } from "@/presentation/common/hooks/usePalette";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import { useStepNext } from "../hooks/useStepNext";
export const UploadStep = (): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { watch, setValue } = usePhotoFormContext();
  const { stepNext } = useStepNext();
  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file == null) {
      return;
    }
    const newPhoto = new Blob([file]);
    setValue("photo", newPhoto);
  };
  const photo = watch("photo");
  const palette = usePalette();
  return (
    <Box css={styles.container}>
      {photo ? (
        <img
          src={URL.createObjectURL(photo)}
          alt="uploaded"
          css={styles.photoPreview(palette)}
        />
      ) : (
        <Box css={styles.photoPreview(palette)}>
          <PhotoLibraryRoundedIcon />
        </Box>
      )}

      <AppButton css={styles.photoButton} onClick={handleUploadClick}>
        <AddPhotoAlternateRoundedIcon />
        <Typography typography={"title-lg"}>Upload Photo</Typography>
      </AppButton>
      <input
        type="file"
        accept="image/*"
        hidden
        multiple={false}
        ref={inputRef}
        onChange={handleUploadChange}
      />
      <AppButton
        onClick={stepNext}
        css={styles.nextButton}
        disabled={photo == null}
      >
        <Typography typography={"h3"}>Next</Typography>
      </AppButton>
    </Box>
  );
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
  `,
  photoButton: css`
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    svg {
      width: 32px;
      height: 32px;
    }
  `,
  photoPreview: (palette: Palette) => css`
    width: 100%;
    aspect-ratio: 1;
    height: auto;
    max-width: 300px;
    object-fit: contain;
    background-color: ${palette.background.level2};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 64px;
      height: 64px;
      color: ${palette.text.secondary};
    }
  `,
  nextButton: css`
    margin-top: 16px;
    width: 100%;
    max-width: 300px;
    padding: 16px;
  `,
};
