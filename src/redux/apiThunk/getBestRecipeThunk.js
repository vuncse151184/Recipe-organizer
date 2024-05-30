import { getBestRecipes } from '../../api/getBestRecipes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const bestRecipes = createAsyncThunk('data/bestRecipe', async () => {
    const data = await getBestRecipes()
    return data
})
