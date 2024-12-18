import { apiGet } from "../../common/utils/web";
import { ProductUrlWithPort } from "../../app/micro-services";

export const getProductById = (idProduct: number) => {
    return apiGet(`${ProductUrlWithPort}/${idProduct}`);
};
