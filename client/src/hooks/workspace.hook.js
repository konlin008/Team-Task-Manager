import {
  addMemberToWorkspaceApi,
  allMembersApi,
  allRequestApi,
  createWorkspaceApi,
  getAllWorkspaceApi,
  reviewRequestApi,
} from "@/api/workspace.api.js";
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
