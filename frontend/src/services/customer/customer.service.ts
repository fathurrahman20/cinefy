import { privateInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import type { Transaction, User } from "./customer.type";

export const getCustomers = async (): Promise<BaseResponse<User[]>> => {
  const res = await privateInstance.get("/admin/users");
  return res.data;
};

export const getTransactions = async (): Promise<
  BaseResponse<Transaction[]>
> => {
  const res = await privateInstance.get("/admin/ticket-transactions");
  return res.data;
};
