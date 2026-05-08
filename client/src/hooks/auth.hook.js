import { getMeApi, loginApi, logoutApi, registerApi } from "@/api/auth.api.js";
import { updateProfileApi } from "@/api/user.api";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    queryKey: ["me"],
    queryFn: getMeApi,
    enabled: false,
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logout Successfully");
    },
  });
};
export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: updateProfileApi,

    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};
