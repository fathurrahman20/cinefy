import { clearSession } from "@/lib/utils";
import { getMovies } from "@/services/movie/movie.service";
import type { Movie } from "@/services/movie/movie.type";
import { useQuery } from "@tanstack/react-query";

export const useGetMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await getMovies();
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
