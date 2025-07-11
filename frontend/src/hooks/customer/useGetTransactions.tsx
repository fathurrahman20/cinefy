import { getTransactions } from "@/services/customer/customer.service";
import type { Transaction } from "@/services/customer/customer.type";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await getTransactions();

      return response.data as Transaction[];
    },
  });
};
