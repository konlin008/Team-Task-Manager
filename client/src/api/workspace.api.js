import api from "./axios";

export const createWorkspaceApi = async (payload) => {
  const res = await api.post("/workspace", payload);
  return res.data;
};
