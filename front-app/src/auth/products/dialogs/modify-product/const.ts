import { ProductEntity } from "../../../../shop/boutique/type";

export const fieldListProduct: { label: string; key: keyof ProductEntity }[] = [
    { label: "Image :", key: "picture_path" },
    { label: "Nom :", key: "name" },
    { label: "Titre :", key: "title" },
    { label: "Description :", key: "description" },
    { label: "Details :", key: "details" },
    { label: "Stock :", key: "stock" },
    { label: "Prix :", key: "price" },
    { label: "Visible :", key: "published" },
];
