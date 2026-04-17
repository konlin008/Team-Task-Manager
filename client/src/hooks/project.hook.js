import {
  createProjectApi,
  deleteProjectApi,
  getProjectsApi,
  projectDetailsApi,
} from "@/api/project.api.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProjectApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["projects"]);
      toast.success(response?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
export const useGetProjects = (workspaceId) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => getProjectsApi(workspaceId),
    enabled: !!workspaceId,
  });
};
export const useProjectDetails = (projectId) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectDetailsApi(projectId),
    enabled: !!projectId,
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["projects"]);
      toast.success(response?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
