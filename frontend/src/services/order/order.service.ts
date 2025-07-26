import { privateInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import type { Transaction } from "./order.type";

export const getOrders = async (): Promise<BaseResponse<Transaction[]>> => {
  const res = await privateInstance.get("/customer/orders");
  return res.data;
};

export const getOrderDetail = async (
  id: string
): Promise<BaseResponse<Transaction>> => {
  const res = await privateInstance.get(`/customer/orders/${id}`);
  return res.data;
};
