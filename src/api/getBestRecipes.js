import api from './api'

export const getBestRecipes = async () => {
    try {
        const response = await api.get(`/api/Recipes/GetBestRecipes`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
}
