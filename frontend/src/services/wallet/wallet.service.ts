import { privateInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import type { WalletTopup, WalletTransaction } from "./wallet.type";

export const getWalletTopupHistory = async (): Promise<
  BaseResponse<WalletTransaction[]>
> => {
  const res = await privateInstance.get("/customer/topup-history");
  return res.data;
};

export const topupWallet = async (data: {
  balance: number;
}): Promise<BaseResponse<WalletTopup>> => {
  const res = await privateInstance.post("/customer/top-up", data);
  return res.data;
};
