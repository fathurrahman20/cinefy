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

export const getGenre = async (id: string): Promise<BaseResponse<Genre>> => {
  const res = await privateInstance.get(`${endpoint}/${id}`);
  return res.data;
};

export const updateGenre = async (id: string, data: GenreValues) => {
  const res = await privateInstance.put(`${endpoint}/${id}`, data);
  return res.data;
};

export const deleteGenre = async (id: string) => {
  const res = await privateInstance.delete(`${endpoint}/${id}`);
  return res.data;
};
