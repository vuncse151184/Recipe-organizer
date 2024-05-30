import api from './api'

export const fetchData = async () => {
    try {
        const response = await api.get(`/api/Recipes/GetAll`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
}
