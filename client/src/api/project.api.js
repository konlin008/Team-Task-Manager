import api from "./axios.js";

export const createProjectApi = async (payload) => {
  const res = await api.post("/project", payload);
  return res.data;
};
export const getProjectsApi = async (workspaceId) => {
  const res = await api.get(`/project/workspace/${workspaceId}`);
  return res.data;
};
export const projectDetailsApi = async (projectId) => {
  const res = await api.get(`/project/${projectId}`);
  return res.data;
};
export const deleteProjectApi = async (projectId) => {
  const res = await api.delete(`/project/${projectId}`);
  return res.data;
};
export const fetchUserProjectsApi = async (type) => {
  const url = type ? `/project/user?type=${type}` : `/project/user`;

  const res = await api.get(url);

  return res.data;
};
