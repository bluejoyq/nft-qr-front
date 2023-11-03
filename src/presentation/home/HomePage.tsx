import { ReactElement } from "react";
import { Steps } from "./steps";
import { Sheet } from "@mui/joy";
import { css } from "@emotion/react";

export const HomePage = (): ReactElement => {
  return (
    <Sheet
      css={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <Steps />
    </Sheet>
  );
};
