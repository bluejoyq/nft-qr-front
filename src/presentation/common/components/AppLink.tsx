import { css } from "@emotion/react";
import { Link, LinkProps } from "react-router-dom";

export const AppLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      css={css`
        text-decoration: none;
        color: inherit;
      `}
    />
  );
};
