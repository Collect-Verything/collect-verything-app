import { apiDelete, apiGet, apiPatch, apiPost } from "../../../common/utils/web";
import { User } from "../../../common/types/user";

export const getAllJobbers = () => {
    return apiGet(`users/jobs/`);
};

export const deleteAJobbers = (id: number) => {
    return apiDelete(`users/${id}`);
};

export const createAJobber = (jobber: User) => {
    return apiPost(`users/job`, jobber);
};

export const patchAJobber = (jobber: User) => {
    return apiPatch(`users/${jobber.id}`, jobber);
};
