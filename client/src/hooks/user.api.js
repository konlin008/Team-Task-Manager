import { serachWorkSpaceApi } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export const useSearchInviteCode = (inviteCode) => {
  return useQuery({
    queryKey: ["searchWorkspace", inviteCode],
    queryFn: () => serachWorkSpaceApi(inviteCode),
    enabled: !!inviteCode,
  });
};
