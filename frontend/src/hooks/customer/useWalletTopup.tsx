import { topupWallet } from "@/services/wallet/wallet.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useWalletTopup = () => {
  return useMutation({
    mutationFn: (data: { balance: number }) => topupWallet(data),
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(`Error nich: ${error.response}`);
      toast.error(error.response?.data.message || "Something went wrong.");
    },
  });
};
