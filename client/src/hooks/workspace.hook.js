import { createWorkspaceApi, getAllWorkspaceApi } from "@/api/workspace.api.js";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllWorkspace = () => {
  return useQuery({
    queryFn: getAllWorkspaceApi,
    queryKey: ["allWorkspace"],
  });
};
export const useCreateWorksapce = () => {
  return useMutation({
    mutationFn: createWorkspaceApi,
  });
};
