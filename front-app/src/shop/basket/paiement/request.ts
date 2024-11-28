import { apiPatch } from "../../../common/utils/web";
import { ProductUrlWithPort } from "../../../app/micro-services";
import { StockAndID } from "./type";

export const updateStockById = (groupStockId: StockAndID[]) =>
    apiPatch(`${ProductUrlWithPort}/update-stock`, groupStockId);
