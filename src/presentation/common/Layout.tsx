import { css } from "@emotion/react";
import { ReactElement } from "react";
import { Footer } from "./components/Footer";

interface LayoutProps {
  children: ReactElement;
}
export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        height: 100vh;
        width: 100vw;
      `}
    >
      {children}
      <Footer />
    </div>
  );
};
