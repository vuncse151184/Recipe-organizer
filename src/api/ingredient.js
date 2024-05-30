import api from "./api";

export const getAllApi = async (movePage, items) => {
    const response = await api.get(`/api/Ingredients/GetAllByAdmin?movePage=${movePage}&itemPerPage=${items}`);
    return response.data;
};

export const getDetailApi = async (id) => {
    const response = await api.get(`/api/Ingredients/Get?id=${id}`);
    return response.data;
};

export const addApi = async (data) => {
    const response = await api.post(`/api/Ingredients/AddIngredient`, data);
    return response.data;
};

export const updateApi = async (id, data) => {
    const response = await api.put(`/api/Ingredients/UpdateIngredient?id=${id}`, data);
    return response.data;
};

export const removeApi = async (id) => {
    const response = await api.delete(`/api/Ingredients/DeleteIngredient?id=${id}`);
    return response.data;
};