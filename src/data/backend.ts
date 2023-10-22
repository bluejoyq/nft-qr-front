import { Nft } from "alchemy-sdk";

export interface PostQRCodeProps {
  data: string;
  nft: Nft;
}

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
export const postQRCode = async ({ nft }: PostQRCodeProps): Promise<Blob> => {
  const imageLink = nft.rawMetadata?.image;
  if (!imageLink) throw new Error("No image link found");
  const imageResponse = await fetch(imageLink, {});
  if (!imageResponse.ok) {
    throw new Error("Failed to download image");
  }
  const file = await imageResponse.blob();

  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/qr`, {
    method: "POST",
    body: formData,
  });
  const result = await res.blob();
  return result;
};
