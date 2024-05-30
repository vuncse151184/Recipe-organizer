import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCountriesAddData } from '../../api/getAllCountryAdd'

export const fetchCountriesAddDataAsync = createAsyncThunk('data/fetchData', async () => {
    const data = await fetchCountriesAddData()
    return data
})

const getAllDataSlice = createSlice({
    name: 'getAllCountriesAddApi',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountriesAddDataAsync.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchCountriesAddDataAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchCountriesAddDataAsync.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})
export const getAllCountriesAdd = getAllDataSlice.reducer
export default getAllCountriesAdd
