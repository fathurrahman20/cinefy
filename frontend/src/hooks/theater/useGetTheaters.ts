import { getTheaters } from "@/services/theater/theater.service";
import type { Theater } from "@/services/theater/theater.type";
import { useQuery } from "@tanstack/react-query";

export const useGetTheaters = () => {
  return useQuery({
    queryKey: ["theaters"],
    queryFn: async () => {
      const data = await getTheaters();

      return data.data as Theater[];
    },
  });
};
