import { getpreviousMessagestApi } from "@/api/messages.api";
import { useQuery } from "@tanstack/react-query";

export const usePreviousMessages = (taskId) => {
  return useQuery({
    queryKey: ["projects", taskId],
    queryFn: () => getpreviousMessagestApi(taskId),
    enabled: !!taskId,
  });
};
