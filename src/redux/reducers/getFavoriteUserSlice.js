import { createSlice } from '@reduxjs/toolkit'
import { userFavor } from '../apiThunk/getFavoriteUserThunk'
import { userFavorites } from '../apiThunk/getFavoriteUserThunk'

const getFavoriteUser = createSlice({
    name: 'getFavoriteRecipe',
    initialState: {
        userFavorites: [],
        uf: [],

        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userFavor.pending, (state) => {
                state.isLoading = true
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(userFavor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoading = 'success'
                state.userFavorites = action.payload
            })
            .addCase(userFavor.rejected, (state, action) => {
                state.isLoading = false
                state.isLoading = 'error'
                state.error = action.error.message
            })
            .addCase(userFavorites.pending, (state) => {
                state.isLoading = true
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(userFavorites.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoading = 'success'
                state.uf = action.payload
            })
            .addCase(userFavorites.rejected, (state, action) => {
                state.isLoading = false
                state.isLoading = 'error'
                state.error = action.error.message
            })
    },
})
export const uFavor = getFavoriteUser.reducer
export default uFavor
