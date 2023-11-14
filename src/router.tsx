import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./presentation/home/HomePage";
import { HOME_PATH, MAKE_PATH } from "./domain/paths";
import { MakePage } from "./presentation/make/MakePage";
import { Layout } from "./presentation/common/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: HOME_PATH,
        element: <HomePage />,
      },
      {
        path: MAKE_PATH,
        element: <MakePage />,
      },
    ],
  },
]);
