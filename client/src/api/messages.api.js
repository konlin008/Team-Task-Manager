import api from "./axios";

export const getpreviousMessagestApi = async (taskId) => {
  const res = await api.get(`/messages/${taskId}`);
  return res.data;
};
