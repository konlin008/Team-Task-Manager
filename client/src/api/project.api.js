import api from "./axios.js";

export const createProjectApi = async (payload) => {
  const res = await api.post("/project", payload);
  return res.data;
};
export const getProjectsApi = async (workspaceId) => {
  const res = await api.get(`/project/workspace/${workspaceId}`);
  return res.data;
};
export const deleteProjectApi = async (projectId) => {
  const res = await api.delete(`/project/${projectId}`);
  return res.data;
};
