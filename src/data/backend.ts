import { api } from "./fetcher";
export interface PostQRCodeProps {
  qrData: string;
  imageUrl: string;
  addtionalPrompt?: string;
  address: string;
  contractAddress: string;
  tokenId: string;
}

export const postQRCode = async ({
  imageUrl,
  qrData,
  addtionalPrompt,
  contractAddress,
  tokenId,
  address,
}: PostQRCodeProps): Promise<Blob> => {
  const res = await api.post(`/qr`, {
    image_url: imageUrl,
    qr_data: qrData,
    addtional_prompt: addtionalPrompt,
    contract_address: contractAddress,
    token_id: tokenId,
    address,
  });
  const result = await res.data;
  return result;
};

export const getHealth = async (): Promise<void> => {
  try {
    await api.get(`/health`, {
      timeout: 1000,
    });
  } catch {
    throw new Error("Server is not running");
  }
};
