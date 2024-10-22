import { apiDelete, apiGet } from "../../../common/utils/web";

export const getAllJobbers = () => {
    return apiGet(`users/jobs/`);
};

export const deleteAJobbers = (id: number) => {
    return apiDelete(`users/${id}`);
};
