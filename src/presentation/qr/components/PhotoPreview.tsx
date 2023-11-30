import { usePalette } from "@/presentation/common/hooks/usePalette";
import { css } from "@emotion/react";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import { Box, Palette } from "@mui/joy";

interface PhotoPreviewProps {
  photo: Blob | null;
}
export const PhotoPreviewBlob = ({ photo }: PhotoPreviewProps) => {
  const palette = usePalette();
  return (
    <>
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
    </>
  );
};

export const PhotoPreviewSrc = ({ src }: { src: string }) => {
  const palette = usePalette();
  return <img src={src} alt="uploaded" css={styles.photoPreview(palette)} />;
};

const styles = {
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
};
