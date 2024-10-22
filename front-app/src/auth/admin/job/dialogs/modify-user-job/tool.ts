import { User } from "../../../../../common/types/user";
import { Dispatch, SetStateAction } from "react";

export const onChangeUser = (param: keyof User, setUser: Dispatch<SetStateAction<User | undefined>>, value: string) => {
    setUser((old) => {
        if (!old) return old;
        if (param === "role") {
            return { ...old, role: { ...old.role, name: value } };
        }
        return { ...old, [param]: value };
    });
};
