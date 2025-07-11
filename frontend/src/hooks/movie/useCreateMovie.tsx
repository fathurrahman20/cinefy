import { createMovie } from "@/services/movie/movie.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useCreateMovie = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: FormData) => createMovie(data),
    onSuccess: () => {
      toast.success("Movie created successfully");
      navigate("/admin/movies");
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
