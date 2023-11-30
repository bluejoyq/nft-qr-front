import { QrHistory } from "@/domain/models";
import { api } from "./fetcher";

export interface PostQRCodeWithPhotoProps {
  photo: Blob;
  qrData: string;
  customValue: string;
}
export const postQRCodeWithPhoto = async ({
  photo,
  qrData,
  customValue: additionalcustom,
}: PostQRCodeWithPhotoProps): Promise<QrHistory> => {
  const res = await api.post(`/qr`, {
    photo: photo,
    qr_data: qrData,
    additional_custom: additionalcustom,
  });

  const result = new QrHistory(res.data);
  return result;
};
export interface PostQRCodePropsWithNft {
  qrData: string;
  imageUrl: string;
  customValue: string;
  address: string;
  contractAddress: string;
  tokenId: string;
}

export const postQRCodeWithNft = async ({
  imageUrl,
  qrData,
  customValue: additionalcustom,
  contractAddress,
  tokenId,
  address,
}: PostQRCodePropsWithNft): Promise<QrHistory> => {
  const res = await api.post(`/qr`, {
    image_url: imageUrl,
    qr_data: qrData,
    additional_custom: additionalcustom,
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
