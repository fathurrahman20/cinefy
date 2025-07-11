import type { BaseResponse } from "@/types/response";
import type { Movie } from "./movie.type";
import { privateInstance } from "@/lib/axios";

const endpoint = "/admin/movies";
export const getMovies = async (): Promise<BaseResponse<Movie[]>> => {
  const res = await privateInstance.get(`${endpoint}`);
  return res.data;
};

export const createMovie = async (data: FormData) => {
  const res = await privateInstance.post(`${endpoint}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getMovie = async (id: string): Promise<BaseResponse<Movie>> => {
  const res = await privateInstance.get(`${endpoint}/${id}`);
  return res.data;
};

export const updateMovie = async (id: string, data: FormData) => {
  const res = await privateInstance.put(`${endpoint}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteMovie = async (id: string) => {
  const res = await privateInstance.delete(`${endpoint}/${id}`);
  return res.data;
};
