import { AppButton } from "@/presentation/common/components/AppButton";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/joy";
import { ReactElement, useRef, useState } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { PhotoPreviewBlob } from "../components/PhotoPreview";

interface UploadStepProps {
  stepNext: (photo: Blob) => void;
  defaultValue: Blob | null;
}
export const UploadStep = ({
  stepNext,
  defaultValue,
}: UploadStepProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    inputRef.current?.click();
  };
  const [photo, setPhoto] = useState<Blob | null>(defaultValue ?? null);

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file == null) {
      return;
    }
    const newPhoto = new Blob([file]);
    setPhoto(newPhoto);
  };

  return (
    <Box css={styles.container}>
      <PhotoPreviewBlob photo={photo} />

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
        onClick={() => {
          if (photo == null) {
            return;
          }
          stepNext(photo);
        }}
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

  nextButton: css`
    margin-top: 16px;
    width: 100%;
    max-width: 500px;
    padding: 16px;
  `,
};
