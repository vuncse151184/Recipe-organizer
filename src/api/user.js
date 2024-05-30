import api from "./api";

export const getUsers = async (movePage, items) => {
    const response = await api.get(`/api/UserAccounts/GetAllUser?movePage=${movePage}&itemPerPage=${items}`);
    return response.data;
};

export const updateRole = async (id, role) => {
    const response = await api.get(`/api/UserAccounts/ChangeRole?id=${id}&roleChange=${role}`);
    return response.data;
};

export const banAccount = async (id) => {
    const response = await api.delete(`/api/UserAccounts/BanUser?userId=${id}`);
    return response.data;
};

export const unBanAccount = async (id) => {
    const response = await api.put(`/api/UserAccounts/UnBanUser?userId=${id}`);
    return response.data;
};