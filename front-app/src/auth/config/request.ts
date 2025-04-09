import { apiGet } from "../../common/utils/web";
import { ConfigUrlWithPort } from "../../app/micro-services";

export const SUBSCRIPTION_URL = "sub";

export const getUserListSolutionSub = (userIdStripe: string) => {
    console.log(userIdStripe);
    return apiGet(`${ConfigUrlWithPort}/${SUBSCRIPTION_URL}/${userIdStripe}`);
};

export const getRecoverSubs = (userIdStripe: string) => {
    return apiGet(`${ConfigUrlWithPort}/${SUBSCRIPTION_URL}/recover/${userIdStripe}`);
};
