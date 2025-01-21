import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginProps } from "../shop/login";
import { getDecodedAccessToken } from "../common/tools/jwt";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { loginRequest } from "../shop/login/request";

const initialState = {
    role: undefined,
    userId: undefined,
    id_stripe: undefined,
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
            state.role = tokenDecoded.role;
            state.userId = tokenDecoded.userId;
            state.id_stripe = tokenDecoded.id_stripe;
            state.firstname = tokenDecoded.firstname;
            state.lastname = tokenDecoded.lastname;

            //     FIX later
            localStorage.setItem("id_stripe", tokenDecoded.id_stripe);
        },
        logout(state) {
            state.role = undefined;
            localStorage.removeItem("token");
        },
    },
});

export const login = (authLogin: LoginProps) => async (dispatch: AppDispatch) => {
    try {
        const res = await loginRequest(authLogin);

        // TODO : Try to catch response code
        // if (res.status.code !== 200) {
        //     throw new Error(`HTTP error! status: ${res.status}`);
        // }

        dispatch(authenticateSlice.actions.saveToken(res.accessToken));
        localStorage.setItem("token", res.accessToken);

        // eslint-disable-next-line
    } catch (error: any) {
        throw new Error(`Login failed! ${error.message}`);
    }
};

export const checkToken = () => async (dispatch: AppDispatch) => {
    const token = await localStorage.getItem("token");
    if (token) {
        dispatch(authenticateSlice.actions.saveToken(token));
    }
};

export const { logout } = authenticateSlice.actions;

export default authenticateSlice.reducer;
