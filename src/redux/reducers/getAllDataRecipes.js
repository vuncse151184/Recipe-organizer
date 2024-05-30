import { createSlice } from '@reduxjs/toolkit'
import { fetchDataAsync } from '../apiThunk/getAllRecipesThunk'

const getAllDataSlice = createSlice({
    name: 'getAllRecipes',
    initialState: {
        getAllRecipes: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.isLoading = true
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoading = 'success'
                state.getAllRecipes = action.payload
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isLoading = 'error'
                state.error = action.error.message
            })
    },
})
export const getAllRecipes = getAllDataSlice.reducer
export default getAllRecipes
