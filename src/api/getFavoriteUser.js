import api from './api'

export const userFavorite = async () => {
    try {
        const response = await api.get(`/api/FavoriteRecipes/GetAllFavorite`)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
}

export const addUserFavorite = async (id) => {
    const response = await api.post(`/api/FavoriteRecipes/AddFavorite?id=${id}`)
    return response.data
}

export const removeRecipeFavorite = async (id) => {
    const response = await api.delete(`/api/FavoriteRecipes/DeleteFavorite?id=${id}`)
    return response.data
}
