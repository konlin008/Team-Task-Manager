import { getMeApi, loginApi, registerApi } from "@/api/auth.api.js";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};
export const useGetMe = () => {
  return useQuery({
    queryFn: getMeApi,
    queryKey: ["me"],
    retry: false,
  });
};
