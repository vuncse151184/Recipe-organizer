import { createSlice } from '@reduxjs/toolkit'
import { bestRecipes } from '../apiThunk/getBestRecipeThunk'

const getBestRecipes = createSlice({
    name: 'getBestRecipes',
    initialState: {
        bestRecipes: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bestRecipes.pending, (state) => {
                state.isLoading = true
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(bestRecipes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoading = 'success'
                state.bestRecipes = action.payload
            })
            .addCase(bestRecipes.rejected, (state, action) => {
                state.isLoading = false
                state.isLoading = 'error'
                state.error = action.error.message
            })
    },
})
export const bestRecipe = getBestRecipes.reducer
export default bestRecipe
