import type { LoginValues } from "@/lib/validation/auth";
import { login } from "@/services/auth/auth.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useCustomerLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginValues) => login(data),
    onSuccess: () => {
      toast.success("Login successfully");
      navigate("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.status === 400) {
        if (error.response.data.message === "Invalid credentials") {
          return toast.error("Email or password is incorrect");
        }
        return toast.error(`${error.response?.data.message}`);
      }
      return toast.error(
        error.response?.data.message || "Something went wrong."
      );
    },
  });
};
