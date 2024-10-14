import { apiPost } from "../../common/utils/web";
import { LoginProps } from "./index";

export const loginRequest = (authLogin: LoginProps) => apiPost(`auth/login/`, "POST", authLogin);
