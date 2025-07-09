import type { BaseResponse } from "@/types/response";
import type { Genre } from "./genre.type";
import { privateInstance } from "@/lib/axios";
import type { GenreValues } from "@/lib/validation/genre";

const endpoint = "/admin/genres";
export const getGenres = async (): Promise<BaseResponse<Genre[]>> => {
  const res = await privateInstance.get(`${endpoint}`);
  return res.data;
};

export const createGenre = async (data: GenreValues) => {
  const res = await privateInstance.post(`${endpoint}`, data);
  return res.data;
};
