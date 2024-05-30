import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getPlanDate,
    getPlanWeek,
    getPlanForCreateApi,
    getDetailApi,
    createApi,
    updateApi,
    removeApi,
    removeDateApi,
    getRecipesPlanApi
} from "../../api/plan";

export const getPlanByDate = createAsyncThunk(
    "plan/fetchPlanDate",
    async ({ date }, thunkAPI) => {
        try {
            const response = await getPlanDate(date);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getPlanByWeek = createAsyncThunk(
    "plan/fetchPlanWeek",
    async ({ date }, thunkAPI) => {
        try {
            const response = await getPlanWeek(date);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getDetail = createAsyncThunk(
    "plan/fetchPlanDetail",
    async ({ id }, thunkAPI) => {
        try {
            const response = await getDetailApi(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getPlanForCreate = createAsyncThunk(
    "plan/fetchForCreate",
    async ({ date }, thunkAPI) => {
        try {
            const response = await getPlanForCreateApi(date);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createPlan = createAsyncThunk(
    "plan/createPlan",
    async ({ data }, thunkAPI) => {
        try {
            const response = await createApi(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updatePlan = createAsyncThunk(
    "plan/updatePlan",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await updateApi(id, data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removePlan = createAsyncThunk(
    "plan/deletePlan",
    async ({ id }, thunkAPI) => {
        try {
            const response = await removeApi(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removeDate = createAsyncThunk(
    "plan/deletePlan",
    async ({ date }, thunkAPI) => {
        try {
            const response = await removeDateApi(date);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getRecipesPlan = createAsyncThunk(
    "plan/fetchAllRecipeForPlan",
    async (thunkAPI) => {
        try {
            const response = await getRecipesPlanApi();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
