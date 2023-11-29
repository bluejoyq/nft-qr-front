import { css } from "@emotion/react";
import { mq } from "./constants/mq";

export const pageContentStyles = css`
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const pagePaddingStyles = css`
  padding: 1rem;

  ${mq.wide} {
    padding: 2rem;
  }
`;
