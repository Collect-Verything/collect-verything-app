import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { useDispatch } from "react-redux";
import { getRecoverSubs, getUserListSolutionSub } from "../auth/config/request";
import { Subscription } from "../auth/config/type";
import { CONFIG_SERVICE } from "../app/micro-services";

/**
 * ==========================================================================
 * Redux Slice - Subscription
 * ==========================================================================
 *
 * Gère l'état lié aux abonnements utilisateurs (Stripe) côté front.
 * Utilise Redux Toolkit pour structurer les appels asynchrones avec `createAsyncThunk`.
 *
 * Objectifs :
 * - Récupérer les abonnements d’un utilisateur connecté
 * - En cas d’incohérence ou de base vide, déclencher un mécanisme de récupération
 *
 * Méthodes exposées :
 * - `fetchUserSubscriptions`       : Récupération classique des subscriptions via Stripe
 * - `recoveryUserSubscriptions`    : Récupération dans le cas d’une désynchronisation
 *
 * Hook utilitaire :
 * - `useAppDispatch` : hook typé pour dispatch Redux
 */


export const useAppDispatch = () => useDispatch<AppDispatch>();

interface SubscriptionState {
    listSub: Subscription[] | undefined;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: SubscriptionState = {
    listSub: undefined,
    status: "idle",
    error: null,
};

export const fetchUserSubscriptions = createAsyncThunk(
    `${CONFIG_SERVICE.servicePath}/fetchUserSubscriptions`,
    async (userStripeId: string) => {
        return await getUserListSolutionSub(userStripeId);
    },
);

export const recoveryUserSubscriptions = createAsyncThunk(
    `${CONFIG_SERVICE.servicePath}/recoveryUserSubscriptions`,
    async (userStripeId: string) => {
        return await getRecoverSubs(userStripeId);
    },
);

// TODO : Les statut et erreur

export const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchUserSubscriptions
            .addCase(fetchUserSubscriptions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserSubscriptions.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
                state.status = "succeeded";
                state.listSub = action.payload;
            })
            .addCase(fetchUserSubscriptions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })
            // recoveryUserSubscriptions
            .addCase(recoveryUserSubscriptions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(recoveryUserSubscriptions.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(recoveryUserSubscriptions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            });
    },
});

export const selectUserSubscriptions = (state: RootState) => state.subscription.listSub;

export default subscriptionSlice.reducer;
