import type { BaseResponse } from "@/types/response";
import type { Theater } from "./theater.type";
import { privateInstance } from "@/lib/axios";
import type { TheaterValues } from "@/lib/validation/theater";

const endpoint = "/admin/theaters";
export const getTheaters = async (): Promise<BaseResponse<Theater[]>> => {
  const res = await privateInstance.get(`${endpoint}`);
  return res.data;
};

export const createTheater = async (data: TheaterValues) => {
  const res = await privateInstance.post(`${endpoint}`, data);
  return res.data;
};

export const getTheater = async (
  id: string
): Promise<BaseResponse<Theater>> => {
  const res = await privateInstance.get(`${endpoint}/${id}`);
  return res.data;
};

export const updateTheater = async (id: string, data: TheaterValues) => {
  const res = await privateInstance.put(`${endpoint}/${id}`, data);
  return res.data;
};

export const deleteTheater = async (id: string) => {
  const res = await privateInstance.delete(`${endpoint}/${id}`);
  return res.data;
};
