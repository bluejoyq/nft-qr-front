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
  customValue,
}: PostQRCodeWithPhotoProps): Promise<QrHistory> => {
  const res = await api.post(
    `/qr`,
    {
      photo: photo,
      qr_data: qrData,
      additional_prompt: customValue,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  const result = new QrHistory(res.data);
  return result;
};
export interface PostQRCodePropsWithNft {
  qrData: string;
  imageUrl: string;
  customValue: string;
}

export const postQRCodeWithNft = async ({
  imageUrl,
  qrData,
  customValue,
}: PostQRCodePropsWithNft): Promise<QrHistory> => {
  const imageRes = await fetch(imageUrl);
  const imageBlob = await imageRes.blob();
  const res = await api.post(
    `/qr`,
    {
      photo: imageBlob,
      qr_data: qrData,
      additional_prompt: customValue,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

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
