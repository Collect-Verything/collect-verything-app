import { apiGet } from "../../common/utils/web";
import { FacturationUrlWithPort, UserUrlWithPort } from "../../app/micro-services";
import { User } from "../../common/types/user";

export const getUserStripeID = (user: User) => apiGet(`${UserUrlWithPort}/${user.id}`);
export const getInvoices = (user: User) => apiGet(`${FacturationUrlWithPort}/invoice/${user.id_stripe}`);
