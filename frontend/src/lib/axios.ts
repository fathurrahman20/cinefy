import axios from "axios";
import { getSession } from "./utils";

const baseUrl = import.meta.env.VITE_API_URL!;

export const globalInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // 10 second
});

export const privateInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // 10 second
});

privateInstance.interceptors.request.use((config) => {
  const session = getSession();

  config.headers.Authorization = `JWT ${session?.token}`;

  return config;
});
