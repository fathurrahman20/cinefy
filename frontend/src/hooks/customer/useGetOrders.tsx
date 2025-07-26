import { getOrders } from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();

      return response.data;
    },
  });
};
