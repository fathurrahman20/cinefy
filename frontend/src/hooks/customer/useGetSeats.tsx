import { getSeats } from "@/services/global/global.service";
import type { SelectedSeat } from "@/services/global/global.type";
import type { ErrorResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGetSeats = (id: string, date: string) => {
  return useQuery<
    SelectedSeat[],
    AxiosError<ErrorResponse>,
    SelectedSeat[],
    ["seats", string]
  >({
    queryKey: ["seats", id],
    queryFn: async () => {
      const response = await getSeats(id, date);
      if (!response.data) {
        toast.error("Seats not found"); // Penting: Tangani kasus data tidak ditemukan
      }
      return response.data;
    },
    enabled: !!id,
  });
};
