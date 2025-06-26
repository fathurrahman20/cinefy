import { z } from "zod";

export const allowedFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const genreSchema = z
  .object({
    name: z.string().min(3).max(50),
  })
  .strict();

export const theaterSchema = z
  .object({
    name: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
  })
  .strict();

export const movieSchema = z
  .object({
    title: z.string().min(5),
    genre: z.string().min(5),
    theaters: z.array(z.string().min(5)).min(1),
    available: z.boolean(),
    description: z.string().min(5).optional(),
    price: z.number(),
    bonus: z.string().optional(),
  })
  .strict();

export const authSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["admin", "customer"]),
});
