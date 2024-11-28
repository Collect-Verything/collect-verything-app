import { Dispatch, SetStateAction } from "react";
import { ProductEntity } from "../../../../shop/boutique/type";
import { PRODUCT_TYPE } from "../../../../common/const/product";

export const onChangeProduct = (
    param: keyof ProductEntity,
    setProduct: Dispatch<SetStateAction<ProductEntity>>,
    value: string,
) => {
    setProduct((old) => {
        // if (!old) return old;
        if (param === "type") {
            return { ...old, type: getTypeProduct(value) };
        }
        return { ...old, [param]: value };
    });
};

const getTypeProduct = (role: string) => {
    if (role === PRODUCT_TYPE.SERVICE) return PRODUCT_TYPE.SERVICE;
    return PRODUCT_TYPE.PRODUCT;
};
