import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './authentication-slice';

export const store = configureStore({
    reducer: {
        authenticate: authenticateReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
