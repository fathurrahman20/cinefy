import { z } from "zod";

export const theaterSchema = z.object({
  name: z.string().min(3),
  city: z.string({ required_error: "Please select a theater city location" })
});

export type TheaterValues = z.infer<typeof theaterSchema>;
