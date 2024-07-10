import { useQuery } from "@tanstack/react-query";

export const useAiSession = () =>
  useQuery({
    enabled: false,
    queryKey: ["createTextSession"],
    queryFn: () => window.ai.createTextSession(),
  });
