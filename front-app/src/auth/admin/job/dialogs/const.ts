import { User } from "../../../../common/types/user";

export const defaultUser: User = {
    id: undefined,
    firstname: "",
    lastname: "",
    email: "",
    password: "InitPassword",
    birthDate: new Date(),
    gender: "",
    phone: "",
    role: { id: 0, name: "", createdAt: "", updatedAt: "" },
    roleId: 0,
    createdAt: "",
    updatedAt: "",
};
