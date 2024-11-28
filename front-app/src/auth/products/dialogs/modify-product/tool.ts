import { Dispatch, SetStateAction } from "react";
import { ProductEntity } from "../../../../shop/boutique/type";
import { PRODUCT_TYPE } from "../../../../common/const/product";

export const onChangeProduct = (
    param: keyof ProductEntity,
    setProduct: Dispatch<SetStateAction<ProductEntity>>,
    value: string,
) => {
    setProduct((old) => {
        if (param === "type") return { ...old, type: getTypeProduct(value) };
        if (param === "price") return { ...old, price: Number(value) };
        if (param === "stock") return { ...old, stock: Number(value) };
        if (param === "published") return { ...old, published: Boolean(value) };
        return { ...old, [param]: value };
    });
};

const getTypeProduct = (role: string) => {
    if (role === PRODUCT_TYPE.SERVICE) return PRODUCT_TYPE.SERVICE;
    return PRODUCT_TYPE.PRODUCT;
};
