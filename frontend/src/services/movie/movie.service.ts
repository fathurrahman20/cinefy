import type { BaseResponse } from "@/types/response";
import type { Movie } from "./movie.type";
import { globalInstance, privateInstance } from "@/lib/axios";
import type { DataMovieDetail } from "../global/global.type";

const endpoint = "/admin/movies";
export const getMovies = async (
  available?: string
): Promise<BaseResponse<Movie[]>> => {
  const res = await globalInstance.get(`/movies`, {
    params: {
      available,
    },
  });
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
  const res = await globalInstance.get(`/movies/${id}`);
  return res.data;
};

export const getMovieDetail = async (
  id: string
): Promise<BaseResponse<DataMovieDetail>> => {
  const res = await privateInstance.get(`/customer/movies/${id}`);
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
