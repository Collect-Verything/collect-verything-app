export class Delivery {}

export interface ItemsDeliveryDeliveryBrokeObject {
  productName: string;
  quantity: number;
}

export interface DeliveryBrokeObject {
  owner: string;
  products: ItemsDeliveryDeliveryBrokeObject[];
  typeDelivery: 'undefined' | 'Point Relais' | 'Magasin';
  email: string;
  name: string;
}
