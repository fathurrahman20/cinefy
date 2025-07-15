import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["admin", "customer"]),
});

export const registerSchema = authSchema.omit({ role: true });

export const loginSchema = authSchema.omit({ name: true });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
