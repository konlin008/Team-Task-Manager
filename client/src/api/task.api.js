import api from "./axios";

export const createTaskApi = async (payload) => {
  const res = await api.post(`/task/`, payload);
  return res.data;
};
export const allTaskApi = async (projectId) => {
  const res = await api.get(`/task/${projectId}`);
  return res.data;
};
export const assignMemberApi = async (taskId, memberId) => {
  const res = await api.put(`/task/${taskId}/assign-member/${memberId}`);
  return res.data;
};
export const editTaskApi = async ({ payload, id }) => {
  const res = await api.put(`/task/${id}`, payload);
  return res.data;
};
export const deleteTaskApi = async (id) => {
  const res = await api.delete(`/task/${id}`);
  return res.data;
};
