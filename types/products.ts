export default interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: string;
  userId: string;
  imageLinks: Array<string>;
  createdAt: Date;
  productId: string;
  category: string;
}

export interface Device {
  IMEI: number;
}

export interface DeviceArray {
  IMEI: number | string;
  id: string;
  user_id: string;
}
