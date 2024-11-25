import { ProductsDetailsType } from "../../common/assets/products/products-details";
import { PAID_FREQUENCY } from "../boutique/const";

export interface BasketDetailsType {
    product: ProductsDetailsType;
    frequency: PAID_FREQUENCY;
}
