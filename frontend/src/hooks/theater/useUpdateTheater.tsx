import type { TheaterValues } from "@/lib/validation/theater";
import { updateTheater } from "@/services/theater/theater.service";
import type { Theater } from "@/services/theater/theater.type";
import type { BaseResponse, ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface UpdateTheaterVariables {
  id: string;
  data: TheaterValues;
}

export const useUpdateTheater = () => {
  const navigate = useNavigate();
  return useMutation<
    BaseResponse<Theater>,
    AxiosError<ErrorResponse>,
    UpdateTheaterVariables
  >({
    mutationFn: ({ id, data }) => updateTheater(id, data),

    onSuccess: () => {
      toast.success("Update Theater successfully");
      navigate("/admin/theaters");
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
