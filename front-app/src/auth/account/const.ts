import { User } from "../../common/types/user";
import { ChangePasswordType } from "./type";
import { AlertColor, AlertPropsColorOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

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

interface labelType {
    label: string;
}

interface labelWithUserField extends labelType {
    field: keyof User;
}

export const listUserField: labelWithUserField[] = [
    { label: "Nom", field: "firstname" },
    { label: "Prenom", field: "lastname" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
];

interface LabelPasswordFieldType extends labelType {
    field: keyof ChangePasswordType;
}

export const listPasswordField: LabelPasswordFieldType[] = [
    { label: "Mot de passe actuel", field: "oldPassword" },
    { label: "Nouveau mot de passe", field: "newPassword" },
    { label: "Confirmation mot de passe", field: "confirmPassword" },
];

export interface AlertType {
    type: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
    text: string;
}
