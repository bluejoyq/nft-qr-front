import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./presentation/home/HomePage";
import { HOME_PATH, NFT_PATH, PHOTO_PATH } from "./domain/paths";
import { NftPage } from "./presentation/qr/NftPage";
import { Layout } from "./presentation/common/Layout";
import { PhotoPage } from "./presentation/qr/PhotoPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: HOME_PATH,
        element: <HomePage />,
      },
      {
        path: NFT_PATH,
        element: <NftPage />,
      },
      {
        path: PHOTO_PATH,
        element: <PhotoPage />,
      },
    ],
  },
]);
