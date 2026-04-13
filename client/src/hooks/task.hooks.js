import {
  allTaskApi,
  createTaskApi,
  deleteTaskApi,
  editTaskApi,
} from "@/api/task.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTaskApi,
    onSuccess: (response) => {
      toast.success(response?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
export const useAllTask = (projectId) => {
  return useQuery({
    queryFn: () => allTaskApi(projectId),
    queryKey: ["tasks"],
  });
};
export const useAssignMember = () => {
  return useMutation({
    mutationFn: editTaskApi,
  });
};
export const use = () => {
  return useMutation({
    mutationFn: deleteTaskApi,
  });
};
