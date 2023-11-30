import { QrHistory } from "@/domain/models";
import { api } from "./fetcher";

export interface PostQRCodeWithPhotoProps {
  photo: Blob;
  qrData: string;
  promptValue: string;
}
export const postQRCodeWithPhoto = async ({
  photo,
  qrData,
  promptValue: additionalPrompt,
}: PostQRCodeWithPhotoProps): Promise<QrHistory> => {
  const res = await api.post(`/qr`, {
    photo: photo,
    qr_data: qrData,
    additional_prompt: additionalPrompt,
  });

  const result = new QrHistory(res.data);
  return result;
};
export interface PostQRCodePropsWithNft {
  qrData: string;
  imageUrl: string;
  promptValue: string;
  address: string;
  contractAddress: string;
  tokenId: string;
}

export const postQRCodeWithNft = async ({
  imageUrl,
  qrData,
  promptValue: additionalPrompt,
  contractAddress,
  tokenId,
  address,
}: PostQRCodePropsWithNft): Promise<QrHistory> => {
  const res = await api.post(`/qr`, {
    image_url: imageUrl,
    qr_data: qrData,
    additional_prompt: additionalPrompt,
    contract_address: contractAddress,
    token_id: tokenId,
    address,
  });

  const result = new QrHistory(res.data);
  return result;
};

export interface GetQrHistoriesResponse {
  data: QrHistory[];
  next: number | null;
}
export const getQrHistories = async (
  offset: number | undefined,
): Promise<GetQrHistoriesResponse> => {
  const res = await api.get(`/qr`, {
    params: {
      offset,
    },
    timeout: 1000,
  });
  const data = res.data.data.map((data: any) => new QrHistory(data));
  return {
    data,
    next: res.data.next,
  };
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
