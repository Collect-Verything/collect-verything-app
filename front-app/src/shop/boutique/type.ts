import { PAYMENT_FREQUENCY } from "../../common/const/payment-frequency";

export interface ProductEntity {
    id: number;
    picture_path: string;
    stripe_id: string;
    stripe_id_price: string;
    name: string;
    title: string;
    description: string;
    details: string;
    type: string;
    stock: number;
    price: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ListBasketType {
    product: ProductEntity;
    paidFrequency: PAYMENT_FREQUENCY;
    quantity: number;
}
