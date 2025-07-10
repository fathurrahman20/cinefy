import type { GenreValues } from "@/lib/validation/genre";
import { updateGenre } from "@/services/genre/genre.service";
import type { Genre } from "@/services/genre/genre.type";
import type { BaseResponse, ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface UpdateGenreVariables {
  id: string;
  data: GenreValues;
}

export const useUpdateGenre = () => {
  const navigate = useNavigate();
  return useMutation<
    BaseResponse<Genre>,
    AxiosError<ErrorResponse>,
    UpdateGenreVariables
  >({
    mutationFn: ({ id, data }) => updateGenre(id, data),

    onSuccess: () => {
      toast.success("Update Genre successfully");
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
