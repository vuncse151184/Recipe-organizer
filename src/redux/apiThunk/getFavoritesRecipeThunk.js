import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFavoriteRecipes } from '../../api/getFavoriteRecipe'

export const favoritesRecipe = createAsyncThunk('data/favoritesRecipe', async () => {
    const data = await getFavoriteRecipes()
    return data
})
