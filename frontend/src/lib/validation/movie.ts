import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(5),
  genre: z.string().min(5),
  theaters: z.array(z.string().min(5)).min(1),
  available: z.boolean().optional(),
  description: z.string().min(5).optional(),
  price: z.string(),
  bonus: z.string().optional(),
  thumbnail: z.any().refine((file: File) => file?.name, {
    message: "Please upload a thumbnail!",
  }),
});

export type MovieValues = z.infer<typeof movieSchema>;
