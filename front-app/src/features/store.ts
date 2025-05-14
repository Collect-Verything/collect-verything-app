import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./authentication-slice";
import userJobSlice from "./user-job-slice";
import userSlice from "./user-slice";
import subscriptionSlice from "./subscription-slice";
import basketSlice from "./basket-slice";

export const store = configureStore({
    reducer: {
        authenticate: authenticateReducer,
        userJob: userJobSlice,
        user: userSlice,
        subscription: subscriptionSlice,
        basket: basketSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
