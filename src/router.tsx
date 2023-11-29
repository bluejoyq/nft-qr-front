import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./presentation/home/HomePage";
import { HOME_PATH, NFT_PATH } from "./domain/paths";
import { NftPage } from "./presentation/nft/NftPage";
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
        path: NFT_PATH,
        element: <NftPage />,
      },
    ],
  },
]);
