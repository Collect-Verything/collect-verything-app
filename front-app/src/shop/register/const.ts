import { User } from "../../common/types/user";
import { Dispatch, SetStateAction } from "react";
import { AlertColor, AlertPropsColorOverrides } from "@mui/material/Alert/Alert";
import { OverridableStringUnion } from "@mui/types";
import {emailRegex} from "../../common/utils/regex";

interface LabelKey<T> {
    label: string;
    key: keyof T;
}

export const userRegisterList: LabelKey<UserRegisterType>[] = [
    { label: "Civilité :", key: "gender" },
    { label: "Date de naissance :", key: "birthDate" },
    { label: "Nom :", key: "lastname" },
    { label: "Prenom :", key: "firstname" },
    { label: "Telephone :", key: "phone" },
    { label: "Email :", key: "email" },
    { label: "Password :", key: "password" },
    { label: "Confirmation Password :", key: "confirmPassword" },
];

export interface UserRegisterType extends User {
    confirmPassword: string;
}

export const initRegisterForm: UserRegisterType = {
    birthDate: new Date(),
    confirmPassword: "",
    createdAt: "",
    email: "",
    firstname: "",
    gender: "",
    id: 0,
    lastname: "",
    password: "",
    phone: "",
    role: { id: 1, name: "USER", createdAt: "", updatedAt: "" },
    roleId: 0,
    updatedAt: "",
};

export const onChangeRegisterField = (
    param: keyof UserRegisterType,
    setProduct: Dispatch<SetStateAction<UserRegisterType>>,
    value: string,
) => {
    setProduct((old) => {
        if (param === "birthDate") return { ...old, birthDate: new Date(value) };
        return { ...old, [param]: value };
    });
};

export interface AlertRegisterType {
    field: keyof UserRegisterType | undefined;
    alertStatus: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
    alertMessage: string;
}

type AlertMessageFieldType = {
    [key: string]: AlertRegisterType;
};
export const ALERT_MESSAGE_FIELD: AlertMessageFieldType = {
    GENDER: { field: "gender", alertStatus: "warning", alertMessage: "Votre civilité doit être présente" },
    BIRTHDATE_LEGAL: { field: "birthDate", alertStatus: "warning", alertMessage: "Vous devez avoir plus de 18 ans" },
    LASTNAME_PRESENT: { field: "lastname", alertStatus: "warning", alertMessage: "Le nom doit être présent" },
    LASTNAME_LENGTH: { field: "lastname", alertStatus: "warning", alertMessage: "Le nom doit contenir entre 2 et 20 caractères" },
    FIRSTNAME_PRESENT: { field: "firstname", alertStatus: "warning", alertMessage: "Le prénom doit être présent" },
    FIRSTNAME_LENGTH: { field: "firstname", alertStatus: "warning", alertMessage: "Le prénom doit contenir entre 2 et 20 caractères" },
    EMAIL_PRESENT: { field: "email", alertStatus: "warning", alertMessage: "L'email doit être présent" },
    EMAIL_REGEX: { field: "email", alertStatus: "warning", alertMessage: "L'email est invalide" },
    PASSWORD_PRESENT: { field: "password", alertStatus: "warning", alertMessage: "Le mot de passe doit être présent",},
    PASSWORD_LENGTH: { field: "password", alertStatus: "warning", alertMessage: "Le mot de passe doit contenir entre 6 et 25 caractères" },
    CONFIRM_PASSWORD_PRESENT: { field: "confirmPassword", alertStatus: "warning", alertMessage: "La confirmation du mot de passe doit être présente" },
    CONFIRM_PASSWORD_LENGTH: { field: "confirmPassword", alertStatus: "warning", alertMessage: "La confirmation du mot de passe ne correspond pas" },
    REGISTER_FAILED: { field: undefined, alertStatus: "error", alertMessage: "Une erreur est apparu lors de votre inscription" },
    REGISTER_SUCCESS: { field: undefined, alertStatus: "success", alertMessage: "Inscription validé" },
} as const;

// TODO : Handle phone number 06 or +33 + all country ....

export const checkRegisterForm = (
    registerForm: UserRegisterType,
    setAlerts: Dispatch<SetStateAction<AlertRegisterType | undefined>>,
): Promise<boolean> => {
    return new Promise((resolve) => {
        // Civilité
        if (!registerForm.gender) {
            setAlerts(ALERT_MESSAGE_FIELD.GENDER);
            resolve(false); // Retourne une erreur
            return;
        }

        // Date de naissance
        const currentDate = new Date();
        const birthDate = new Date(registerForm.birthDate);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const isOver18 =
            age > 18 ||
            (age === 18 &&
                (currentDate.getMonth() > birthDate.getMonth() ||
                    (currentDate.getMonth() === birthDate.getMonth() &&
                        currentDate.getDate() >= birthDate.getDate())));

        if (registerForm.birthDate && !isOver18) {
            setAlerts(ALERT_MESSAGE_FIELD.BIRTHDATE_LEGAL);
            resolve(false);
            return;
        }

        // Nom
        if (!registerForm.lastname) {
            setAlerts(ALERT_MESSAGE_FIELD.LASTNAME_PRESENT);
            resolve(false);
            return;
        }

        if (registerForm.lastname.length < 2 || registerForm.lastname.length > 20) {
            setAlerts(ALERT_MESSAGE_FIELD.LASTNAME_LENGTH);
            resolve(false);
            return;
        }

        // Prénom
        if (!registerForm.firstname) {
            setAlerts(ALERT_MESSAGE_FIELD.FIRSTNAME_PRESENT);
            resolve(false);
            return;
        }

        if (registerForm.firstname.length < 2 || registerForm.firstname.length > 20) {
            setAlerts(ALERT_MESSAGE_FIELD.FIRSTNAME_LENGTH);
            resolve(false);
            return;
        }

        // Email
        if (!registerForm.email) {
            setAlerts(ALERT_MESSAGE_FIELD.EMAIL_PRESENT);
            resolve(false);
            return;
        }

        if (!emailRegex.test(registerForm.email)) {
            setAlerts(ALERT_MESSAGE_FIELD.EMAIL_REGEX);
            resolve(false);
            return;
        }

        // Mot de passe
        if (!registerForm.password) {
            setAlerts(ALERT_MESSAGE_FIELD.PASSWORD_PRESENT);
            resolve(false);
            return;
        }

        if (registerForm.password.length < 6 || registerForm.password.length > 25) {
            setAlerts(ALERT_MESSAGE_FIELD.PASSWORD_LENGTH);
            resolve(false);
            return;
        }

        // Confirmation du mot de passe
        if (!registerForm.confirmPassword) {
            setAlerts(ALERT_MESSAGE_FIELD.CONFIRM_PASSWORD_PRESENT);
            resolve(false);
            return;
        }

        if (registerForm.confirmPassword !== registerForm.password) {
            setAlerts(ALERT_MESSAGE_FIELD.CONFIRM_PASSWORD_LENGTH);
            resolve(false);
            return;
        }

        // Toutes les validations sont ok
        setAlerts(undefined);
        resolve(true);
    });
};
