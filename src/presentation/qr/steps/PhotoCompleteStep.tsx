import { AppButton } from "@/presentation/common/components/AppButton";
import { usePalette } from "@/presentation/common/hooks/usePalette";
import { css } from "@emotion/react";
import { Box, Palette, Typography } from "@mui/joy";
import { ReactElement } from "react";
import { PhotoPreviewBlob } from "../components/PhotoPreview";
import { PhotoForm, usePhotoFormContext } from "../hooks/usePhotoForm";
import { useMutation } from "@tanstack/react-query";
import { postQRCodeWithPhoto } from "@/data/backend";
import { QRResult } from "../components/QRResult";

const useCreatePhoto = () => {
  return useMutation({
    mutationFn: async (formData: PhotoForm) => {
      return await postQRCodeWithPhoto({
        ...formData,
        customValue: formData.custom?.value ?? "",
      });
    },
  });
};

export const PhotoCompleteStep = (): ReactElement => {
  const { watch } = usePhotoFormContext();
  const palette = usePalette();
  const formData = watch();
  const { photo, qrData, custom } = formData;
  const { mutateAsync, isPending, data } = useCreatePhoto();

  const handleCreate = async () => {
    await mutateAsync(formData);
  };
  return (
    <Box css={styles.container}>
      <PhotoPreviewBlob photo={photo} />
      <Box css={styles.optionContainer(palette)}>
        <Typography typography={"title-lg"}>QR Data</Typography>
        <Typography>{qrData}</Typography>
      </Box>
      {custom?.key != null && (
        <Box css={styles.optionContainer(palette)}>
          <Typography typography={"title-lg"}>Custom</Typography>
          <Typography>{custom.key}</Typography>
        </Box>
      )}
      {data == null ? (
        <AppButton
          css={styles.nextButton}
          loading={isPending}
          onClick={() => handleCreate()}
        >
          <Typography typography={"h3"}>{!isPending && "Create"}</Typography>
        </AppButton>
      ) : (
        <QRResult result={data} />
      )}
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
    width: 100%;
  `,
  optionContainer: (palette: Palette) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    background-color: ${palette.background.level2};
    border-radius: 8px;
    padding: 8px 64px;
  `,
  nextButton: css`
    margin-top: 16px;
    width: 100%;
    max-width: 500px;
    padding: 16px;
    height: 64px;
  `,
};
