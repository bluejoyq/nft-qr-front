import { Expose } from "class-transformer";
export class QrHistory {
  id: number;
  address: string;
  @Expose({
    name: "contract_address",
  })
  contractAddress: string;
  @Expose({
    name: "token_id",
  })
  tokenId: string;
  @Expose({
    name: "image_src",
  })
  imageSrc: string;
  @Expose({
    name: "qr_data",
  })
  qrData: string;
  constructor(data: any) {
    this.id = data.id;
    this.address = data.address;
    this.contractAddress = data.contract_address;
    this.tokenId = data.token_id;
    this.imageSrc = data.image_src;
    this.qrData = data.qr_data;
  }
}
