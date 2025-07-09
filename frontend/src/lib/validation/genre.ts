import { z } from "zod";

export const genreSchema = z.object({
  name: z.string().min(5),
});

export type GenreValues = z.infer<typeof genreSchema>;
