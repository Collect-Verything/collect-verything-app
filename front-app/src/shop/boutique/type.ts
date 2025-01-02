import { PAID_FREQUENCY } from "./const";

export interface ProductEntity {
    id: number;
    picture_path: string;
    stripe_id: string;
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
    paidFrequency: PAID_FREQUENCY;
    quantity: number;
}
