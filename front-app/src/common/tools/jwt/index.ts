import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line
export const getDecodedAccessToken = (token: string): any => {
    try {
        return jwtDecode(token);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (Error) {
        return null;
    }
};
