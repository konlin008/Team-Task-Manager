import api from "./axios";

export const serachWorkSpaceApi = async (inviteCode) => {
  const res = await api.get(`user/search-workSpace?inviteCode=${inviteCode}`);
  return res.data;
};
export const requestToJoinWorkspaceApi = async (workspaceId) => {
  const res = await api.get(`user/requestToJoin/${workspaceId}`);
  return res.data;
};
export const assignedTasksApi = async () => {
  const res = await api.get(`user/assigned-task`);
  return res.data;
};
