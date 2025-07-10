import { getTheater } from "@/services/theater/theater.service";
import type { Theater } from "@/services/theater/theater.type";
import type { ErrorResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGetTheater = (id: string) => {
  return useQuery<Theater, AxiosError<ErrorResponse>, Theater, ["theater", string]>({
    queryKey: ["theater", id],
    queryFn: async () => {
      const response = await getTheater(id);
      if (!response.data) {
        toast.error("Theater not found"); // Penting: Tangani kasus data tidak ditemukan
      }
      return response.data as Theater;
    },
    enabled: !!id,
  });
};
