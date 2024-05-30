import { createAsyncThunk } from '@reduxjs/toolkit'
import { userFavorite } from '../../api/getFavoriteUser'
import { addUserFavorite } from '../../api/getFavoriteUser'
import { removeRecipeFavorite } from '../../api/getFavoriteUser'

export const userFavor = createAsyncThunk('data/userFavorite', async () => {
    const data = await userFavorite()
    return data
})

export const userFavorites = createAsyncThunk('data/userFavorites', async (id) => {
    try {
        const response = await addUserFavorite(id)
        return response
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
})
export const removeFavor = createAsyncThunk('data/removeFavorite', async (id) => {
    try {
        const response = await removeRecipeFavorite(id)
        return response
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
})
