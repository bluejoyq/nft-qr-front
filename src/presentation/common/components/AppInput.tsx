import { css } from "@emotion/react";
import { Input, InputProps } from "@mui/joy";
import { forwardRef } from "react";
import { mq } from "../constants/mq";

export const AppInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <Input ref={ref} css={inputStyles} {...props} />;
  },
);

const inputStyles = css`
  border-radius: 8px;
  font-size: 16px;
  ${mq.wide} {
    font-size: 24px;
    padding: 12px;
  }
`;
