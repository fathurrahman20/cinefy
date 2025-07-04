export interface LoginResponse {
  name: string;
  email: string;
  role: "admin" | "customer";
  token: string;
}
