import type { GenreValues } from "@/lib/validation/genre";
import { createGenre } from "@/services/genre/genre.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useCreateGenre = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: GenreValues) => createGenre(data),
    onSuccess: () => {
      toast.success("Genre created successfully");
      navigate("/admin/genres");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.status === 400) {
        return toast.error(`${error.response?.data.message}`);
      }
      return toast.error(
        error.response?.data.message || "Something went wrong."
      );
    },
  });
};
