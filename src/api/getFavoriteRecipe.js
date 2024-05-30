import api from './api'

export const getFavoriteRecipes = async () => {
    try {
        const response = await api.get(`/api/Recipes/GetMostFavoriteRecipes`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
}
