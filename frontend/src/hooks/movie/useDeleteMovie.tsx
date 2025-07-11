import { queryClient } from "@/main";
import { deleteMovie } from "@/services/movie/movie.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDeleteMovie = () => {
  return useMutation({
    mutationFn: (id: string) => deleteMovie(id),
    onSuccess: () => {
      toast.success("Movie deleted successfully");
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
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
