import {
  allTaskApi,
  assignMemberApi,
  createTaskApi,
  deleteTaskApi,
  editTaskApi,
  taskDetailsApi,
  unassignedMembersApi,
} from "@/api/task.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignMemberApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["unAssigned-members tasks"]);
      toast.success(response?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
export const useTaskDetails = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => taskDetailsApi(taskId),
    enabled: !!taskId,
  });
};
export const useEditTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTaskApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success(response?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: deleteTaskApi,
  });
};
export const useUnassignedMembers = (taskId) => {
  return useQuery({
    queryKey: ["unAssigned-members", taskId],
    queryFn: () => unassignedMembersApi(taskId),
    enabled: !!taskId,
  });
};
