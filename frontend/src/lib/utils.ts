import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import secureLocalStorage from "react-secure-storage";
import type { LoginResponse } from "@/services/auth/auth.type";
import dayjs from "dayjs";

export const CITIES = ["Jakarta", "Bandung", "Bekasi", "Depok", "Bogor"];

export const SESSION_KEY = "SESSION_KEY";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSession() {
  const session = secureLocalStorage.getItem(SESSION_KEY) as LoginResponse;

  if (!session) {
    return null;
  }

  return session;
}

export function clearSession() {
  const session = secureLocalStorage.removeItem(SESSION_KEY);

  return session;
}

export function formatIdr(idr: number | undefined) {
  const parsed = idr?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${"Rp "}${parsed}`;
}

export function formatDate(
  date: Date | string,
  format: string = "DD MMMM YYYY"
) {
  return dayjs(date).format(format);
}

export function generateUserPhoto(name: string | undefined = "User") {
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${name}&size=64`;
}
