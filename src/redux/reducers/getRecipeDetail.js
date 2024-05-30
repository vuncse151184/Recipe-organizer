import { createSlice } from '@reduxjs/toolkit'
import { fetchRecipeDetail } from '../apiThunk/getRecipeDetailThunk'

const getDetailRecipe = createSlice({
    name: 'getDetailRecipe',
    initialState: {
        recipeDetail: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipeDetail.pending, (state) => {
                state.isLoading = true
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(fetchRecipeDetail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoading = 'success'
                state.recipeDetail = action.payload
            })
            .addCase(fetchRecipeDetail.rejected, (state, action) => {
                state.isLoading = false
                state.isLoading = 'error'
                state.error = action.error.message
            })
    },
})
export const getRecipeDetail = getDetailRecipe.reducer
export default getRecipeDetail
