import api from "./axios";

export const getStates = async () => {
    const response = await api.get("/api/states");
    return response.data;
};

export const getCitiesByState = async (stateId) => {
    const response = await api.get(
        `/api/states/${stateId}/cities`
    );

    return response.data;
};