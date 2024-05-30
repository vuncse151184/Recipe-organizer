import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllApi,
    getDetailApi,
    addApi,
    updateApi,
    removeApi
} from '../../api/ingredient'

export const getAllIngredient = createAsyncThunk(
    "ingredient/fetchAllIngredient",
    async ({ movePage, items }, thunkAPI) => {
        try {
            const response = await getAllApi(movePage, items);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getIngredientDetail = createAsyncThunk(
    "ingredient/fetchIngredientDetail",
    async ({ id }, thunkAPI) => {
        try {
            const response = await getDetailApi(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addIngredient = createAsyncThunk(
    "ingredient/addIngredient",
    async ({ data }, thunkAPI) => {
        try {
            const response = await addApi(data
                );
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateIngredient = createAsyncThunk(
    "ingredient/updateIngredient",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await updateApi(id, data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removeIngredient = createAsyncThunk(
    "ingredient/deleteIngredient",
    async ({ id }, thunkAPI) => {
        try {
            const response = await removeApi(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);