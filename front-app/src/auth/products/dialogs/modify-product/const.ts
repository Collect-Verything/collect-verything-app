import { ProductEntity } from "../../../../shop/boutique/type";

export const fieldListProduct: { label: string; key: keyof ProductEntity }[] = [
    { label: "Image :", key: "picture_path" },
    { label: "Nom :", key: "name" },
    { label: "Titre :", key: "title" },
    { label: "Prix :", key: "price" },
    { label: "Stock :", key: "stock" },
    { label: "Visible :", key: "published" },
    { label: "Description :", key: "description" },
    { label: "Details :", key: "details" },
];
