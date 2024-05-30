import { fetchData } from '../../api/getAllData'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchDataAsync = createAsyncThunk('data/fetchData', async () => {
    const data = await fetchData()
    return data
})
