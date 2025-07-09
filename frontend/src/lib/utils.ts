import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import secureLocalStorage from "react-secure-storage";
import type { LoginResponse } from "@/services/auth/auth.type";

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
