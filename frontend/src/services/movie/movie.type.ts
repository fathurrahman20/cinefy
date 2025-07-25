import type { Genre } from "../genre/genre.type";
import type { Theater } from "../theater/theater.type";

export interface Movie {
  _id: string;
  title: string;
  genre: Pick<Genre, "_id" | "name">;
  theaters: Theater[];
  description: string;
  thumbnail: string;
  price: number;
  available: boolean;
  bonus: string;
  thumbnailUrl: string;
}
