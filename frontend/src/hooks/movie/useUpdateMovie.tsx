import { updateMovie } from "@/services/movie/movie.service";
import type { Movie } from "@/services/movie/movie.type";
import type { BaseResponse, ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface UpdateMovieVariables {
  id: string;
  data: FormData;
}

export const useUpdateMovie = () => {
  const navigate = useNavigate();
  return useMutation<
    BaseResponse<Movie>,
    AxiosError<ErrorResponse>,
    UpdateMovieVariables
  >({
    mutationFn: ({ id, data }) => updateMovie(id, data),

    onSuccess: () => {
      toast.success("Update Movie successfully");
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
