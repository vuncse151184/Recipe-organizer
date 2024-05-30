import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getUsers,
    updateRole,
    banAccount,
    unBanAccount
} from '../../api/user'

export const getAllUser = createAsyncThunk(
    "user/fetchUser",
    async ({ movePage, items }, thunkAPI) => {
        try {
            const response = await getUsers(movePage, items);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const changeRole = createAsyncThunk(
    "uesr/changeRole",
    async ({ id, role }, thunkAPI) => {
        try {
            const response = await updateRole(id, role);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const banUser = createAsyncThunk(
    "uesr/banUser",
    async ({ id }, thunkAPI) => {
        try {
            const response = await banAccount(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const unbanUser = createAsyncThunk(
    "uesr/unbanUser",
    async ({ id }, thunkAPI) => {
        try {
            const response = await unBanAccount(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);