import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { useDispatch } from "react-redux";
import { getUserListSolutionSub } from "../auth/config/request";
import { Subscription } from "../auth/config/type";
import { User } from "../common/types/user";

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
    "subscription/fetchUserSubscriptions",
    async (userStripeId: Pick<User, "id_stripe">) => {
        return await getUserListSolutionSub(userStripeId);
    },
);

// TODO : Les statut et erreur

export const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const selectUserSubscriptions = (state: RootState) => state.subscription.listSub;

export default subscriptionSlice.reducer;
