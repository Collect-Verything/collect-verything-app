import { apiGet } from "../../../common/utils/web";

export const getAllJobbers = () => {
    return apiGet(`users/jobs/`, "GET");
};
