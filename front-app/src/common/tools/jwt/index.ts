import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line
export const getDecodedAccessToken = (token: string): any => {
    try {
        return jwtDecode(token);
    } catch (Error) {
        return null;
    }
};
