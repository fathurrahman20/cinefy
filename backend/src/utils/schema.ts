import { z } from "zod";

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
