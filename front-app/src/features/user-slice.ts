import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { User } from "../common/types/user";
import { createAUser, deleteAUser, getAllUsers, patchAUser } from "../auth/admin/customer/request";

/**
 * ==========================================================================
 * Redux Slice - Users (Admin View)
 * ==========================================================================
 *
 * Ce slice gère les utilisateurs clients accessibles depuis l'interface admin :
 * - Récupération de la liste des utilisateurs
 * - Création d’un utilisateur
 * - Mise à jour d’un utilisateur
 * - Suppression d’un utilisateur
 *
 * Chaque opération effectue un `refetch` de la liste après exécution.
 */

const initialState = {
    usersList: [] as User[],
    status: "idle", // idle | loading | succeeded | failed
    error: null as string | null,
};

export const useAppDispatch: () => AppDispatch = useDispatch;

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    const response = await getAllUsers();
    return response;
});

export const deleteUserById = createAsyncThunk("user/deleteUser", async (id: string, { dispatch }) => {
    await deleteAUser(Number(id));
    return dispatch(fetchUsers());
});

export const patchUserById = createAsyncThunk("user/patchUser", async (user: User, { dispatch }) => {
    await patchAUser(user);
    return dispatch(fetchUsers());
});

export const createUser = createAsyncThunk("user/", async (user: User, { dispatch }) => {
    await createAUser(user);
    return dispatch(fetchUsers());
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Gestion du Get all users
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.usersList = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })

            // Gestion de la suppression user
            .addCase(deleteUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteUserById.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })

            // Gestion du patch user
            .addCase(patchUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(patchUserById.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(patchUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })

            // Gestion du create user
            .addCase(createUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUser.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            });
    },
});

export default userSlice.reducer;
