import { privateInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import type { Transaction, User, WalletTransaction } from "./customer.type";

export const getCustomers = async (): Promise<BaseResponse<User[]>> => {
  const res = await privateInstance.get("/admin/users");
  return res.data;
};

export const getTransactions = async (): Promise<
  BaseResponse<Transaction[]>
> => {
  const res = await privateInstance.get("/admin/ticket-transaction");
  return res.data;
};

export const getWalletTransactions = async (): Promise<
  BaseResponse<WalletTransaction[]>
> => {
  const res = await privateInstance.get("/admin/wallet-transaction");
  return res.data;
};
