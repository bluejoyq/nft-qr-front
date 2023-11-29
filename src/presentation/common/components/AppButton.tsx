import { css } from "@emotion/react";
import { Button, ButtonProps, IconButton } from "@mui/joy";

export const AppButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      css={css`
        text-decoration: none;
        color: inherit;
        border-radius: 8px;
      `}
    />
  );
};

export const AppIconButton = (props: ButtonProps) => {
  return (
    <IconButton
      {...props}
      css={css`
        text-decoration: none;
        color: inherit;
        border-radius: 8px;
        padding: 8px;
      `}
    />
  );
};
