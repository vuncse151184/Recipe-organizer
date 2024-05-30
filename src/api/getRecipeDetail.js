import api from './api'

export const fetchDetailData = async (id) => {
    try {
        const response = await api.get(`/api/Recipes/Get?id=${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`)
    }
}
