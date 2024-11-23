import { apiDelete, apiGet, apiPatch, apiPost } from "../../../common/utils/web";
import { User } from "../../../common/types/user";
import { UserUrlWithPort } from "../../../app/micro-services";

export const getAllUsers = () => {
    return apiGet(`${UserUrlWithPort}`);
};

export const deleteAUser = (id: number) => {
    return apiDelete(`${UserUrlWithPort}/${id}`);
};

export const createAUser = (jobber: User) => {
    return apiPost(`${UserUrlWithPort}/`, jobber);
};

export const patchAUser = (jobber: User) => {
    return apiPatch(`${UserUrlWithPort}/${jobber.id}`, jobber);
};
