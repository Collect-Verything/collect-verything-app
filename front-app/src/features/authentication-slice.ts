import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginProps } from "../shop/login";
import { getDecodedAccessToken } from "../common/tools/jwt";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { loginRequest } from "../shop/login/request";
import { User } from "../common/types/user";

/**
 * ==========================================================================
 * Redux Slice - Authentification Utilisateur
 * ==========================================================================
 *
 * Gère l'état d'authentification de l'utilisateur connecté via JWT :
 * - Sauvegarde des informations utilisateur à partir du token
 * - Récupération du token depuis le localStorage (persistance)
 * - Déconnexion (reset de l'état + suppression du token)
 * - Mise à jour dynamique de l'ID Stripe client
 */

const initialState: Partial<User> = {
    role: undefined,
    id: undefined,
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
            state.id = tokenDecoded.id;
            state.id_stripe = tokenDecoded.id_stripe;
            state.firstname = tokenDecoded.firstname;
            state.lastname = tokenDecoded.lastname;
        },
        logout(state) {
            state.role = undefined;
            localStorage.removeItem("token");
        },
        updateStripeIdCustomer(state, action: PayloadAction<string>) {
            state.id_stripe = action.payload;
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

export const updateStripeId = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(authenticateSlice.actions.updateStripeIdCustomer(id));
};

export const checkToken = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        dispatch(authenticateSlice.actions.saveToken(token));
    }
};

export const { logout } = authenticateSlice.actions;

export default authenticateSlice.reducer;
