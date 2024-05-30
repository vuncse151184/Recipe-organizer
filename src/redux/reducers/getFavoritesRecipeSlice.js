import { createSlice } from '@reduxjs/toolkit'
import { favoritesRecipe } from '../apiThunk/getFavoritesRecipeThunk'

const getFavoriteRecipe = createSlice({
    name: 'getFavoriteRecipe',
    initialState: {
        favoriteRecipe: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(favoritesRecipe.pending, (state) => {
                state.isLoading = true
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(favoritesRecipe.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoading = 'success'
                state.favoriteRecipe = action.payload
            })
            .addCase(favoritesRecipe.rejected, (state, action) => {
                state.isLoading = false
                state.isLoading = 'error'
                state.error = action.error.message
            })
    },
})
export const favoriteRecipe = getFavoriteRecipe.reducer
export default favoriteRecipe
