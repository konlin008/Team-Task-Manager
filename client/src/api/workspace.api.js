import api from "./axios";

export const getAllWorkspaceApi = async () => {
  const res = await api.get("/workspace");
  return res.data;
};
export const createWorkspaceApi = async (payload) => {
  const res = await api.post("/workspace", payload);
  return res.data;
};
export const allMembersApi = async (workspaceId) => {
  const res = await api.get(`/workspace/${workspaceId}/all-members`);
  return res.data;
};
export const addMemberToWorkspaceApi = async (workspaceId) => {
  const res = await api.post(`/workspace/${workspaceId}/add-member`);
  return res.data;
};
export const allRequestApi = async (workspaceId) => {
  const res = await api.get(`/workspace/${workspaceId}/all-requests`);
  return res.data;
};
export const reviewRequestApi = async (workspaceId, requestId, review) => {
  const res = await api.put(
    `/workspace/${workspaceId}/requests/${requestId}`,
    review,
  );
  return res.data;
};
