import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./presentation/home/HomePage";
import { MAIN_PATH } from "./domain/paths";

export const router = createBrowserRouter([
  {
    path: MAIN_PATH,
    element: <HomePage />,
  },
]);
