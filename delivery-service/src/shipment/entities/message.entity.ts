import { DeliveryStatus } from '@prisma/client';

export type Message = {
  owner: string;
  products: { productName: string; quantity: number }[];
  typeDelivery: DeliveryStatus;
  email: string;
  name: string;
};
