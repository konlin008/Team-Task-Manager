import { createWorkspaceApi } from "@/api/workspace.api.js";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorksapce = () => {
  return useMutation({
    mutationFn: createWorkspaceApi,
  });
};
