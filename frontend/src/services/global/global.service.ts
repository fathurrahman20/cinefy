import type { BaseResponse } from "@/types/response";
import type { MovieExplore } from "./global.type";
import { privateInstance } from "@/lib/axios";

export const getMovieByGenre = async (
  genreId: string
): Promise<BaseResponse<MovieExplore>> => {
  const res = await privateInstance.get(`/customer/browse-movies/${genreId}`);
  return res.data;
};
