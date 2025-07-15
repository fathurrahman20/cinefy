import { globalInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import type { LoginResponse } from "./auth.type";
import type { LoginValues, RegisterValues } from "@/lib/validation/auth";

export const login = async (
  data: LoginValues
): Promise<BaseResponse<LoginResponse>> => {
  return globalInstance.post("/auth/login", data).then((res) => res.data);
};
export const register = async (
  data: RegisterValues
): Promise<BaseResponse<null>> => {
  return globalInstance.post("/auth/register", data).then((res) => res.data);
};
