import { getMovie } from "@/services/movie/movie.service";
import type { Movie } from "@/services/movie/movie.type";
import type { ErrorResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGetMovie = (id: string) => {
  return useQuery<Movie, AxiosError<ErrorResponse>, Movie, ["movie", string]>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await getMovie(id);
      if (!response.data) {
        toast.error("Movie not found"); // Penting: Tangani kasus data tidak ditemukan
      }
      return response.data as Movie;
    },
    enabled: !!id,
  });
};
