import { fetchDetailData } from '../../api/getRecipeDetail'
import { createAsyncThunk } from '@reduxjs/toolkit'
export const fetchRecipeDetail = createAsyncThunk('data/fetchData', async (id) => {
    const data = await fetchDetailData(id)
    return data
})
