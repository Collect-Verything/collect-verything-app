import { apiPost } from "../../common/utils/web";
import { LoginProps } from "./index";
import { AuthUrlWithPort } from "../../app/micro-services";

export const loginRequest = (authLogin: LoginProps) => apiPost(`${AuthUrlWithPort}/login/`, authLogin);
