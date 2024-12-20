import { apiPost } from "../../common/utils/web";
import { AuthUrlWithPort } from "../../app/micro-services";
import {ForgotPassword} from "./index";

export const forgotPasswordRequest = (email: ForgotPassword) => apiPost(`${AuthUrlWithPort}/forgot-password/`, email);
