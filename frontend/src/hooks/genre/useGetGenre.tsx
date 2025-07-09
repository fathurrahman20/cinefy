import { getGenre } from "@/services/auth/genre/genre.service";
import type { Genre } from "@/services/auth/genre/genre.type";
import type { ErrorResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGetGenre = (id: string) => {
  return useQuery<Genre, AxiosError<ErrorResponse>, Genre, ["genre", string]>({
    queryKey: ["genre", id],
    queryFn: async () => {
      const response = await getGenre(id);
      if (!response.data) {
        toast.error("Genre not found"); // Penting: Tangani kasus data tidak ditemukan
      }
      return response.data as Genre;
    },
    enabled: !!id,
  });
};
