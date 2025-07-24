import type { Movie } from "../movie/movie.type";
import type { Theater } from "../theater/theater.type";

type MovieTheater = Movie & {
  theaters: Pick<Theater, "_id" | "city">[];
};

export interface MovieExplore {
  filteredMovies: Movie[];
  allMovies: MovieTheater[];
}

export interface Seat {
  seat: string;
  isBooked: boolean;
}

export interface MovieDetail extends Movie {
  theaters: Theater[];
  description: string;
  price: number;
  available: boolean;
  bonus: string;
  seats: Seat[];
  times: string[];
}

export interface DataMovieDetail {
  movie: MovieDetail;
}

export interface SelectedSeat {
  seat: string;
  _id: string;
}
