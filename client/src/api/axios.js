import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-m25e.onrender.com/api",
  withCredentials: true,
});
export default api;
