import api from "./axios";

export const loginApi = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};
export const registerApi = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};
