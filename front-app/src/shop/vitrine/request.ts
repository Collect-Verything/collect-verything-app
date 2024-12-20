import { apiGet } from "../../common/utils/web";
import { ProductUrlWithPort } from "../../app/micro-services";

export const getAllProducts = () => {
    return apiGet(`${ProductUrlWithPort}`);
};
