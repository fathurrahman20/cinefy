import { globalInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import { z } from "zod";
import type { LoginResponse } from "./auth.type";

export const authSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["admin", "customer"]),
});

export const loginSchema = authSchema.omit({ name: true });

export type LoginValues = z.infer<typeof loginSchema>;

export const login = async (
  data: LoginValues
): Promise<BaseResponse<LoginResponse>> => {
  return globalInstance.post("/auth/login", data).then((res) => res.data);
};
