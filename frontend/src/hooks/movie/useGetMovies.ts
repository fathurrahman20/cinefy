import { clearSession } from "@/lib/utils";
import { getMovies } from "@/services/movie/movie.service";
import type { Movie } from "@/services/movie/movie.type";
import { useQuery } from "@tanstack/react-query";

export const useGetMovies = (available?: string) => {
  return useQuery({
    queryKey: ["movies", available],
    queryFn: async () => {
      const response = await getMovies(available);
      if (
        response.message === "Token expired" ||
        response.message === "Token Unauthorized"
      ) {
        clearSession();
      }

      return response.data as Movie[];
    },
  });
};
