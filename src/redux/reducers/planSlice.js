
import { createSlice } from "@reduxjs/toolkit";
import { getPlanByDate, getPlanByWeek, getDetail, getRecipesPlan, getPlanForCreate } from "../apiThunk/planThunk";

const planSlice = createSlice({
    name: "plans",
    initialState: {
        plans: [],
        detail: [],
        food: [],
        recipePlan: [],
        form: [],
        loading: false,
        loadingPlan: false,
    },
    extraReducers: {
        [getPlanByWeek.pending]: (state, action) => {           //get all week
            state.loading = true;
            state.loading = "loading"
        },
        [getPlanByWeek.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.plans = action.payload;
        },
        [getPlanByWeek.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getPlanByDate.pending]: (state, action) => {           //get by date
            state.loading = true;
            state.loading = "loading"
        },
        [getPlanByDate.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.detail = action.payload;
        },
        [getPlanForCreate.pending]: (state, action) => {           //get by date for create
            state.loadingPlan = true;
            state.loadingPlan = "loading"
        },
        [getPlanForCreate.fulfilled]: (state, action) => {
            state.loadingPlan = false;
            state.loading = "succeeded";
            state.form = action.payload;
        },
        [getPlanForCreate.rejected]: (state, action) => {
            state.loadingPlan = false;
            state.loading = "failed";
        },
        [getDetail.pending]: (state, action) => {               //get detail of recipe
            state.loading = true;
            state.loading = "loading"
        },
        [getDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.food = action.payload;
        },
        [getDetail.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getRecipesPlan.pending]: (state, action) => {          //get all recipe
            state.loadingPlan = true;
            state.loadingPlan = "loading"
        },
        [getRecipesPlan.fulfilled]: (state, action) => {
            state.loadingPlan = false;
            state.loadingPlan = "succeeded";
            state.recipePlan = action.payload;
        },
        [getRecipesPlan.rejected]: (state, action) => {
            state.loadingPlan = false;
            state.loadingPlan = "failed";
        },
    },
});

export default planSlice.reducer;