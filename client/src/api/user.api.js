import api from "./axios";

export const serachWorkSpaceApi = async (inviteCode) => {
  const res = api.get(`user/search-workSpace?inviteCode=${inviteCode}`);
  return res.data;
};
