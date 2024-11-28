import { apiDelete, apiPatch, apiPost } from "../../common/utils/web";
import { ProductUrlWithPort } from "../../app/micro-services";
import { ProductEntity } from "../../shop/boutique/type";

export const deleteProductById = (id: number) => {
    return apiDelete(`${ProductUrlWithPort}/${id}`);
};

export const patchProductById = (id: number, product: ProductEntity) => {
    return apiPatch(`${ProductUrlWithPort}/${id}`, product);
};

export const createProduct = (product: ProductEntity) => {
    return apiPost(`${ProductUrlWithPort}`, product);
};
