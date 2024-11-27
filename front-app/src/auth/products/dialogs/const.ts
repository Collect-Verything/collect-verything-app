import { ProductEntity } from "../../../shop/boutique/type";

export const defaultProduct: ProductEntity = {
    createdAt: new Date(),
    description: "",
    details: "",
    id: 0,
    name: "",
    picture_path: "",
    price: 0,
    published: false,
    stock: 0,
    title: "",
    type: "",
    updatedAt: new Date(),
};
