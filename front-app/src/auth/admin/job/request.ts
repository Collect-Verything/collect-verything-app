import { apiDelete, apiGet, apiPatch, apiPost } from "../../../common/utils/web";
import { User } from "../../../common/types/user";
import { UserUrlWithPort } from "../../../app/micro-services";

export const getAllJobbers = () => {
    return apiGet(`${UserUrlWithPort}/jobs/`);
};

export const deleteAJobbers = (id: number) => {
    return apiDelete(`${UserUrlWithPort}/${id}`);
};

export const createAJobber = (jobber: User) => {
    return apiPost(`${UserUrlWithPort}/job`, jobber);
};

export const patchAJobber = (jobber: User) => {
    return apiPatch(`${UserUrlWithPort}/${jobber.id}`, jobber);
};
