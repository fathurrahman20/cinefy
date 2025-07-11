import { getWalletTransactions } from "@/services/customer/customer.service";
import type { WalletTransaction } from "@/services/customer/customer.type";
import { useQuery } from "@tanstack/react-query";

export const useGetWalletTransactions = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await getWalletTransactions();

      return response.data as WalletTransaction[];
    },
  });
};
