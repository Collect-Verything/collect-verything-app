import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteAJobbers, getAllJobbers, patchAJobber } from "../auth/admin/job/request";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { User } from "../common/types/user";

const initialState = {
    usersJobList: [] as User[],
    status: "idle", // idle | loading | succeeded | failed
    error: null as string | null,
};

export const useAppDispatch: () => AppDispatch = useDispatch;

export const fetchJobbers = createAsyncThunk("userJob/fetchJobbers", async () => {
    const response = await getAllJobbers();
    return response;
});

export const deleteById = createAsyncThunk("userJob/deleteJobber", async (id: string, { dispatch }) => {
    await deleteAJobbers(Number(id));
    return dispatch(fetchJobbers());
});

export const patchById = createAsyncThunk("userJob/patchJobber", async (user: User, { dispatch }) => {
    await patchAJobber(user);
    return dispatch(fetchJobbers());
});

export const userJobSlice = createSlice({
    name: "userJob",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Gestion du Get all jobbers
            .addCase(fetchJobbers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchJobbers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.usersJobList = action.payload;
            })
            .addCase(fetchJobbers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })

            // Gestion de la suppression jobber
            .addCase(deleteById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteById.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            })

            // Gestion du patch jobber
            .addCase(patchById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(patchById.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(patchById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? null;
            });
    },
});

export default userJobSlice.reducer;
