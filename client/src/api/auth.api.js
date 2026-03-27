import axios from "axios";
import instance from "./axios";

export const loginApi = async ({ payload }) => {
  const { data } = await instance.post("/auth/login", { payload });
  return data;
};
