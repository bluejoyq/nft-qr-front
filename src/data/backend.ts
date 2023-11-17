import axios from "axios";
export interface PostQRCodeProps {
  qrData: string;
  imageUrl: string;
  prompt?: string;
}

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
export const postQRCode = async ({
  imageUrl,
  qrData,
  prompt,
}: PostQRCodeProps): Promise<Blob> => {
  const res = await fetch(`${BASE_URL}/qr`, {
    method: "POST",
    body: JSON.stringify({
      image_url: imageUrl,
      qr_data: qrData,
      prompt,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.blob();
  return result;
};

export const getHealth = async (): Promise<void> => {
  try {
    await axios.get(`${BASE_URL}/health`, {
      timeout: 1000,
    });
  } catch {
    throw new Error("Server is not running");
  }
};
