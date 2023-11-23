import { css } from "@emotion/react";
import { ReactElement } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

export const Layout = (): ReactElement => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
      `}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
