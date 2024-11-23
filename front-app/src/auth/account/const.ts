import { User } from "../../common/types/user";

export const initUser: User = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthDate: new Date(),
    gender: "",
    phone: "",
    role: { createdAt: "", updatedAt: "", name: "", id: 0 },
    roleId: 0,
    updatedAt: "",
    createdAt: "",
};

interface labelWithField {
    label: string;
    field: keyof User;
}

export const listUserField: labelWithField[] = [
    { label: "Nom", field: "firstname" },
    { label: "Prenom", field: "lastname" },
    // { label: "Genre", field: "gender" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
];
