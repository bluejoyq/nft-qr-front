export interface PostQRCodeProps {
  qrData: string;
  imageUrl: string;
}

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
export const postQRCode = async ({
  imageUrl,
  qrData,
}: PostQRCodeProps): Promise<Blob> => {
  const res = await fetch(`${BASE_URL}/qr`, {
    method: "POST",
    body: JSON.stringify({
      image_url: imageUrl,
      qr_data: qrData,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.blob();
  return result;
};
