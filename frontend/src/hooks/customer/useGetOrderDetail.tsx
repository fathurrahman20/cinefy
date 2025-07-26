import { getOrderDetail } from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const response = await getOrderDetail(id);

      return response.data;
    },
    enabled: !!id,
  });
};
