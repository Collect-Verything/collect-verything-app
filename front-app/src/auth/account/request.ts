import { apiGet, apiPatch } from "../../common/utils/web";
import { User } from "../../common/types/user";

export const getUserById = (id: number) => {
    return apiGet(`users/${id}`);
};

export const postModifyUser = async (user: User) => {
    return await apiPatch(`users/${user.id}`, user);
};
