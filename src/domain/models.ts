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
  constructor(
    id: number,
    address: string,
    contractAddress: string,
    tokenId: string,
    imageSrc: string,
    qrData: string
  ) {
    this.id = id;
    this.address = address;
    this.contractAddress = contractAddress;
    this.tokenId = tokenId;
    this.imageSrc = imageSrc;
    this.qrData = qrData;
  }
}
