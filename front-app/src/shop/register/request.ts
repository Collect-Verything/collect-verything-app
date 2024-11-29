import { apiPost } from "../../common/utils/web";
import { AuthUrlWithPort } from "../../app/micro-services";
import { User } from "../../common/types/user";

export const registerRequest = (registerForm: User) => apiPost(`${AuthUrlWithPort}/register/`, registerForm);
