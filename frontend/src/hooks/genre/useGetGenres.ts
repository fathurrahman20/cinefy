import { getGenres } from "@/services/genre/genre.service";
import type { Genre } from "@/services/genre/genre.type";
import { useQuery } from "@tanstack/react-query";

export const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const data = await getGenres();

      return data.data as Genre[];
    },
  });
};
