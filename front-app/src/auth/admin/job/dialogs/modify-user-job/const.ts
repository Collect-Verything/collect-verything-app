import { User } from "../../../../../common/types/user";

export const fieldListUser: { label: string; key: keyof User }[] = [
    { label: "Nom :", key: "lastname" },
    { label: "Prenom :", key: "firstname" },
    { label: "Telephone :", key: "phone" },
    { label: "Email :", key: "email" },
];
