import { getWalletTopupHistory } from "@/services/wallet/wallet.service";
import { useQuery } from "@tanstack/react-query";

export const useGetWalletTopupHistory = () => {
  return useQuery({
    queryKey: ["wallet-topup-history"],
    queryFn: async () => {
      const response = await getWalletTopupHistory();

      return response.data;
    },
  });
};
