import type { TheaterValues } from "@/lib/validation/theater";
import { createTheater } from "@/services/theater/theater.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useCreateTheater = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: TheaterValues) => createTheater(data),
    onSuccess: () => {
      toast.success("Theater created successfully");
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
