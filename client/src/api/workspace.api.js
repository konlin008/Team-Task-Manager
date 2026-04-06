import api from "./axios";

export const getAllWorkspaceApi = async () => {
  const res = await api.get("/workspace");
  return res.data;
};
export const createWorkspaceApi = async (payload) => {
  const res = await api.post("/workspace", payload);
  return res.data;
};
