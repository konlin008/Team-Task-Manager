import {
  addMemberToWorkspaceApi,
  allMembersApi,
  allRequestApi,
  createWorkspaceApi,
  getAllWorkspaceApi,
  reviewRequestApi,
} from "@/api/workspace.api.js";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllWorkspace = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryFn: getAllWorkspaceApi,
    queryKey: ["allWorkspace"],
    enabled: !!user,
  });
};
export const useCreateWorksapce = () => {
  return useMutation({
    mutationFn: createWorkspaceApi,
  });
};
export const useAllMembers = (workspaceId) => {
  return useQuery({
    queryFn: () => allMembersApi(workspaceId),
    queryKey: ["members"],
  });
};
export const useAddMembers = () => {
  return useMutation({
    mutationFn: addMemberToWorkspaceApi,
  });
};
export const useAllRequests = (workspaceId) => {
  return useQuery({
    queryFn: () => allRequestApi(workspaceId),
    queryKey: ["requests"],
    retry: false,
  });
};
export const useReviewRequest = () => {
  return useMutation({
    mutationFn: reviewRequestApi,
  });
};
