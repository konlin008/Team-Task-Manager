import {
  assignedTasksApi,
  requestToJoinWorkspaceApi,
  serachWorkSpaceApi,
} from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export const useSearchInviteCode = (inviteCode) => {
  return useQuery({
    queryKey: ["searchWorkspace", inviteCode],
    queryFn: () => serachWorkSpaceApi(inviteCode),
    enabled: false,
    retry: false,
  });
};
export const useRequestToJoinWorkspace = (workspaceId) => {
  return useQuery({
    queryKey: ["joinWorkspace", workspaceId],
    queryFn: () => requestToJoinWorkspaceApi(workspaceId),
    enabled: false,
    retry: false,
  });
};
export const useAssignedTasks = () => {
  return useQuery({
    queryKey: ["assigned-task"],
    queryFn: assignedTasksApi,
    retry: false,
  });
};
