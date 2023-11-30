import { ReactElement } from "react";
import { pageContentStyles, pagePaddingStyles } from "../common/styles";
import { css } from "@emotion/react";
import { PhotoStepper } from "./components/PhotoStepper";
import { FormProvider } from "react-hook-form";
import { PhotoForm, usePhotoForm } from "./hooks/usePhotoForm";
import { UploadStep } from "./steps/UploadStep";

export const PhotoPage = (): ReactElement => {
  const methods = usePhotoForm();

  const onSubmit = (data: PhotoForm) => {
    console.log(data);
  };

  const { handleSubmit, watch } = methods;
  const currentStep = watch("currentStep");
  return (
    <FormProvider {...methods}>
      <form
        css={[pageContentStyles, pagePaddingStyles]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <PhotoStepper />
        {currentStep == "Upload Photo" && <UploadStep />}
      </form>
    </FormProvider>
  );
};

const styles = {
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
};
