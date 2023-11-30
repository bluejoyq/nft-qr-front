import { AppButton } from "@/presentation/common/components/AppButton";
import { usePalette } from "@/presentation/common/hooks/usePalette";
import { css } from "@emotion/react";
import { Box, Palette, Typography } from "@mui/joy";
import { ReactElement } from "react";
import { PhotoPreviewSrc } from "../components/PhotoPreview";
import { useMutation } from "@tanstack/react-query";
import { postQRCodeWithNft } from "@/data/backend";
import { QRResult } from "../components/QRResult";
import { NftForm, useNftFormContext } from "../hooks/useNftForm";

const useCreateNftQr = () => {
  return useMutation({
    mutationFn: async (formData: NftForm) => {
      const imageUrl = formData.nft?.image.cachedUrl;
      if (imageUrl == null) {
        throw new Error("Image is null");
      }
      return await postQRCodeWithNft({
        ...formData,
        imageUrl,
        customValue: formData.custom?.value ?? "",
      });
    },
  });
};

export const NftCompleteStep = (): ReactElement => {
  const { watch } = useNftFormContext();
  const palette = usePalette();
  const formData = watch();
  const { nft, qrData, custom } = formData;
  const { mutateAsync, isPending, data } = useCreateNftQr();

  const handleCreate = async () => {
    await mutateAsync(formData);
  };
  return (
    <Box css={styles.container}>
      <PhotoPreviewSrc src={nft?.image.cachedUrl ?? ""} />
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
