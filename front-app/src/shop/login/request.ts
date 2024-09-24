import { api } from "../../common/utils/web";
import { LoginProps } from "./index";

export const loginRequest = (authLogin: LoginProps) => api(`auth/login/`, "POST", authLogin);
