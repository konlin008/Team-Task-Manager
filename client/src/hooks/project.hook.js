import {
  createProjectApi,
  deleteProjectApi,
  getProjectsApi,
} from "@/api/project.api.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["getProjects"]);
    },
  });
};
export const useGetProjects = (workspaceId) => {
  return useQuery({
    queryKey: ["getProjects", workspaceId],
    queryFn: () => getProjectsApi(workspaceId),
    enabled: !!workspaceId,
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["getProjects"]);
    },
  });
};
