import api from "./axios";

export const registerUser = async (formData) => {
    const response = await api.post("/api/users", formData);

    return response.data;
};

export const getUsers = async (params = {}) => {
    const response = await api.get("/api/users", {
        params,
    });

    return response.data;
};