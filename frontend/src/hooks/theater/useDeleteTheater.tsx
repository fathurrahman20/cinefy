import { queryClient } from "@/main";
import { deleteTheater } from "@/services/theater/theater.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDeleteTheater = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTheater(id),
    onSuccess: () => {
      toast.success("Theater deleted successfully");
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
      queryClient.invalidateQueries({ queryKey: ["theaters"] });
    },
  });
};
