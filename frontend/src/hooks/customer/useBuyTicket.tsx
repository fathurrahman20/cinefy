import { setStep } from "@/redux/features/ticket/ticketSlice";
import {
  buyTicket,
  type TransactionValues,
} from "@/services/global/global.service";
import type { ErrorResponse } from "@/types/response";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const useBuyTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: TransactionValues) => buyTicket(data),
    onSuccess: () => {
      toast.success("Tickets booked successfully");

      dispatch(
        setStep({
          step: "SUCCESS",
        })
      );

      navigate("/transaction-ticket/success");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Something went wrong.");
    },
  });
};
