import api from './api'

export const userReview = async (data) => {
    const response = await api.post(`/api/Reviews/AddReview`, data)
    return response.data
}

export const deteteReview = async (id) => {
    const response = await api.delete(`/api/Reviews/DeleteReview?id=${id}`)
    return response.data
}
