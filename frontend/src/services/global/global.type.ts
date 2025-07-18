import type { Movie } from "../movie/movie.type";
import type { Theater } from "../theater/theater.type";

type MovieTheater = Movie & {
  theaters: Pick<Theater, "_id" | "city">[];
};

export interface MovieExplore {
  filteredMovies: Movie[];
  allMovies: MovieTheater[];
}
