import { privateInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import type { WalletTopup, WalletTransaction } from "./wallet.type";

export const getWalletTopupHistory = async (): Promise<
  BaseResponse<WalletTransaction[]>
> => {
  const res = await privateInstance.get("/customer/topup-history");
  return res.data;
};

export const topupWallet = async (
  price: number
): Promise<BaseResponse<WalletTopup>> => {
  const res = await privateInstance.post("/global/handle-payment", {
    balance: price,
  });
  return res.data;
};
