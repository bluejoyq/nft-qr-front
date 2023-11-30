import { Expose } from "class-transformer";
export class QrHistory {
  id: number;

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
    this.imageSrc = data.image_src;
    this.qrData = data.qr_data;
  }
}
