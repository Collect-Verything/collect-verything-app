import { apiDelete, apiGet, apiPatch, apiPost } from "../../../common/utils/web";
import { User } from "../../../common/types/user";

export const getAllUsers = () => {
    return apiGet(`users/`);
};

export const deleteAUser = (id: number) => {
    return apiDelete(`users/${id}`);
};

export const createAUser = (jobber: User) => {
    return apiPost(`users/`, jobber);
};

export const patchAUser = (jobber: User) => {
    return apiPatch(`users/${jobber.id}`, jobber);
};
