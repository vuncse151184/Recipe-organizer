import api from "./api";

export const getPlanWeek = async (date) => {
    const response = await api.get(`/api/Plans/GetPlanWeek?date=${date}`);
    return response.data;
};

export const getPlanDate = async (date) => {
    const response = await api.get(`/api/Plans/GetPlanDate?date=${date}`);
    return response.data;
};

export const getPlanForCreateApi = async (date) => {
    const response = await api.get(`/api/Plans/GetRecipeOfPlanDate?date=${date}`);
    return response.data;
};

export const getDetailApi = async (id) => {
    const response = await api.get(`/api/Plans/GetPlainDetail?planDetailId=${id}`);
    return response.data;
};

export const createApi = async (data) => {
    const response = await api.post(`/api/Plans/CreatePlanDetail`, data);
    return response.data;
};

export const updateApi = async (id, data) => {
    const response = await api.put(`/api/Plans/UpdatePlanDetail?id=${id}`, data);
    return response.data;
};

export const removeApi = async (id) => {
    const response = await api.delete(`/api/Plans/DeletePlanDetail?id=${id}`);
    return response.data;
};

export const removeDateApi = async (date) => {
    const response = await api.delete(`/api/Plans/DeletePlanOfDate?date=${date}`);
    return response.data;
};

export const getRecipesPlanApi = async () => {
    const response = await api.get(`/api/Recipes/GetAll`);
    return response.data;
}