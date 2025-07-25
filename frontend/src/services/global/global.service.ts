import type { BaseResponse } from "@/types/response";
import type { Balance, MovieExplore, SelectedSeat } from "./global.type";
import { privateInstance } from "@/lib/axios";
import type { FilterState } from "@/redux/features/filter/filterSlice";
import z from "zod";

export const filterSchema = z.object({
  genre: z.string().nullable(),
  city: z.string().nullable(),
  availability: z.string().nullable(),
  theaters: z.array(z.string()).nullable(),
});

export const transactionSchema = z.object({
  subtotal: z.number(),
  total: z.number(),
  bookingFee: z.number(),
  tax: z.number(),
  movieId: z.string(),
  theaterId: z.string(),
  seats: z.array(z.string()),
  date: z.string(),
});

export type FilterValues = z.infer<typeof filterSchema>;
export type TransactionValues = z.infer<typeof transactionSchema>;

export const getMovieByGenre = async (
  genreId: string,
  params?: FilterState
): Promise<BaseResponse<MovieExplore>> => {
  const res = await privateInstance.get(`/customer/browse-movies/${genreId}`, {
    params,
  });
  return res.data;
};

export const getSeats = async (
  movieId: string,
  date: string
): Promise<BaseResponse<SelectedSeat[]>> => {
  const res = await privateInstance.get(`/customer/check-seats/${movieId}`, {
    params: {
      date,
    },
  });
  return res.data;
};

export const getBalance = async (): Promise<BaseResponse<Balance>> => {
  const res = await privateInstance.get("/customer/check-balance");
  return res.data;
};

export const buyTicket = async (data: TransactionValues) => {
  const res = await privateInstance.post("/customer/transaction/buy", data);
  return res.data;
};
