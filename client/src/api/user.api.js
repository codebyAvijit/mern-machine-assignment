import api from "./axios";
import axiosInstance from "./axios";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data.data;
};

export const registerUser = async (formData) => {
  const response = await api.post("/users", formData);

  return response.data.data;
};

export const getUsers = async (params = {}) => {
  const response = await api.get("/users", { params });

  return response.data.data;
};
