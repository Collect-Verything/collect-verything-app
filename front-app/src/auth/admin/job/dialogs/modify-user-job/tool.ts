import { User } from "../../../../../common/types/user";
import { Dispatch, SetStateAction } from "react";
import { ROLE_NAME } from "../../../../../common/const/user";

export const onChangeUser = (param: keyof User, setUser: Dispatch<SetStateAction<User>>, value: string) => {
    setUser((old) => {
        // if (!old) return old;
        if (param === "role") {
            return { ...old, role: { ...old.role, name: value }, roleId: getRoleId(value) };
        }
        return { ...old, [param]: value };
    });
};

const getRoleId = (role: string) => {
    if (role === ROLE_NAME.USER) return 1;
    if (role === ROLE_NAME.SUPER_ADMIN) return 2;
    if (role === ROLE_NAME.INVOICE) return 3;
    if (role === ROLE_NAME.SUPPORT) return 4;
    return 0;
};
