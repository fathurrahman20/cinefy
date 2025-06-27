import { Router } from "express";
import {
  getAvailableSeats,
  getGenre,
  getMovieDetail,
  getMovies,
} from "../../../controllers/globalController";

const globalRoutes = Router();

globalRoutes.get("/movies", getMovies);
globalRoutes.get("/genres", getGenre);
globalRoutes.get("/movies/:id", getMovieDetail);
globalRoutes.get("check-seats/:movieId", getAvailableSeats);

export default globalRoutes;
