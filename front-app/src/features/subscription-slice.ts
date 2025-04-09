import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { useDispatch } from "react-redux";
import { getRecoverSubs, getUserListSolutionSub } from "../auth/config/request";
import { Subscription } from "../auth/config/type";
import { CONFIG_SERVICE } from "../app/micro-services";

/*
 * @fetchUserSubscriptions : Recuperation des user sub
 * @recoveryUserSubscriptions : Permet de recuperer les sub d'un user dans le cas ou la base des sub est vide, mais pas les config...
 * */

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
