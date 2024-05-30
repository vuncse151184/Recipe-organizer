import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMealsData } from '../../api/getAllMeal'

export const fetchMealsDataAsync = createAsyncThunk('data/fetchData', async () => {
    const data = await fetchMealsData()
    return data
})

const getAllDataSlice = createSlice({
    name: 'getAllMealsApi',
    initialState: {
        meal: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMealsDataAsync.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchMealsDataAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchMealsDataAsync.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})
export const getAllMeals = getAllDataSlice.reducer
export default getAllMeals
