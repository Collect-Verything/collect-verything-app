import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginProps } from "../shop/login";
import { getDecodedAccessToken } from "../common/tools/jwt";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { loginRequest } from "../shop/login/request";
import { throwErrorResponse } from "../common/utils/web";

const initialState = {
    role: undefined,
    userId: undefined,
    firstname: undefined,
    lastname: undefined,
};
export const useAppDispatch: () => AppDispatch = useDispatch;

export const authenticateSlice = createSlice({
    name: "authenticate",
    initialState,
    reducers: {
        saveToken(state, action: PayloadAction<string>) {
            const tokenDecoded = getDecodedAccessToken(action.payload);
            state.role = tokenDecoded.roles[0].name;
            state.userId = tokenDecoded.userId;
            state.firstname = tokenDecoded.firstname;
            state.lastname = tokenDecoded.lastname;
        },
        logout(state) {
            state.role = undefined;
        },
    },
});

export const login = (authLogin: LoginProps) => async (dispatch: AppDispatch) => {
    try {
        const res = await loginRequest(authLogin);
        const data = await throwErrorResponse(res);

        dispatch(authenticateSlice.actions.saveToken(data.accessToken));
        // eslint-disable-next-line
    } catch (error: any) {
        throw new Error(`Login failed! ${error.message}`);
    }
};

export const { logout } = authenticateSlice.actions;

export default authenticateSlice.reducer;
