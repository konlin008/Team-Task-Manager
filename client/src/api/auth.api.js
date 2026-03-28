import api from "./axios";

export const loginApi = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};
