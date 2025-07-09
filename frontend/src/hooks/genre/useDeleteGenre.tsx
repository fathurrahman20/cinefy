import { queryClient } from "@/main";
import { deleteGenre } from "@/services/auth/genre/genre.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDeleteGenre = () => {
  return useMutation({
    mutationFn: (id: string) => deleteGenre(id),
    onSuccess: () => {
      toast.success("Genre deleted successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.status === 400) {
        return toast.error(`${error.response?.data.message}`);
      }
      return toast.error(
        error.response?.data.message || "Something went wrong."
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });
};
