import { getBalance } from "@/services/global/global.service";
import { useQuery } from "@tanstack/react-query";

export const useGetBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await getBalance();

      return response.data;
    },
  });
};
