import type { RegisterValues } from "@/lib/validation/auth";
import { register } from "@/services/auth/auth.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useCustomerRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterValues) => register(data),
    onSuccess: () => {
      toast.success("Register successfully");
      navigate("/");
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
