import type { BaseResponse } from "@/types/response";
import type { MovieExplore } from "./global.type";
import { privateInstance } from "@/lib/axios";
import type { FilterState } from "@/redux/features/filter/filterSlice";
import z from "zod";

export const filterSchema = z.object({
  genre: z.string().nullable(),
  city: z.string().nullable(),
  availability: z.string().nullable(),
  theaters: z.array(z.string()).nullable(),
});

export type FilterValues = z.infer<typeof filterSchema>;

export const getMovieByGenre = async (
  genreId: string,
  params?: FilterState
): Promise<BaseResponse<MovieExplore>> => {
  const res = await privateInstance.get(`/customer/browse-movies/${genreId}`, {
    params,
  });
  return res.data;
};
