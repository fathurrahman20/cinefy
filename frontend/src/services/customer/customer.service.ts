import { privateInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import type { User } from "./customer.type";

export const getCustomers = async (): Promise<BaseResponse<User[]>> => {
  const res = await privateInstance.get("/admin/users");
  return res.data;
};
