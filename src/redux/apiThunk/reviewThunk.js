import { userReview, deteteReview } from '../../api/review'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addReview = createAsyncThunk('data/addReview', async ({ data }) => {
    try {
        const response = await userReview(data)
        return response
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
})

export const removeReview = createAsyncThunk('data/removeReview', async (id) => {
    try {
        const response = await deteteReview(id)
        return response
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
})
