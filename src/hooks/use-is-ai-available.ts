import { useQuery } from "@tanstack/react-query";

export const useIsAiAvailable = () =>
  useQuery({
    queryKey: ["isAiAvailable"],
    queryFn: async () => {
      if (!("ai" in window)) {
        return false;
      }

      const status = await window.ai.canCreateTextSession();
      return status === "readily";
    },
  });
