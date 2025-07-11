import { getCustomers } from "@/services/customer/customer.service";
import type { User } from "@/services/customer/customer.type";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await getCustomers();

      return response.data as User[];
    },
  });
};
