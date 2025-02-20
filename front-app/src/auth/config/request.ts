import { User } from "../../common/types/user";
import { apiGet } from "../../common/utils/web";
import { ConfigUrlWithPort } from "../../app/micro-services";

export const SUBSCRIPTION_URL = 'sub';

export const getUserListSolutionSub = (userIdStripe: Pick<User, "id_stripe">) => {
    return apiGet(`${ConfigUrlWithPort}/${SUBSCRIPTION_URL}/${userIdStripe}`);
};
