import { css } from "@emotion/react";
import { Button, ButtonProps } from "@mui/joy";

export const AppButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      css={css`
        text-decoration: none;
        color: inherit;
        border-radius: 8px;
        font-weight: 700;
        font-size: 24px;
      `}
    />
  );
};
