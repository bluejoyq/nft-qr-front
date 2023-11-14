import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./presentation/home/HomePage";
import { HOME_PATH, MAKE_PATH } from "./domain/paths";
import { MakePage } from "./presentation/make/MakePage";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <HomePage />,
  },
  {
    path: MAKE_PATH,
    element: <MakePage />,
  },
]);
