import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDecodedAccessToken = (token: string): any => {
    try {
        return jwtDecode(token);
    } catch (Error) {
        return null;
    }
};
