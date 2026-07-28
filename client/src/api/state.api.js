import api from "./axios";

export const getStates = async () => {
  const response = await api.get("/states");
  return response.data.data;
};

export const getCitiesByState = async (stateId) => {
  const response = await api.get(`/states/${stateId}/cities`);
  return response.data.data;
};
