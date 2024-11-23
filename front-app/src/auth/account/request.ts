import { apiGet, apiPatch } from "../../common/utils/web";
import { User } from "../../common/types/user";
import { ChangePasswordType } from "./type";
import { UserUrlWithPort } from "../../app/micro-services";

export const getUserById = (id: number) => {
    return apiGet(`${UserUrlWithPort}/${id}`);
};

export const postModifyUser = async (user: User) => {
    return await apiPatch(`${UserUrlWithPort}/${user.id}`, user);
};

export const patchModifyPasswordUser = async (userId: number, passwords: ChangePasswordType) => {
    const cleanObject = {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
    };
    return await apiPatch(`${UserUrlWithPort}/password/${userId}`, cleanObject);
};
