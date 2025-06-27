import { Router } from "express";
import {
  getGenre,
  getMovieDetail,
  getMovies,
} from "../../../controllers/globalController";

const globalRoutes = Router();

globalRoutes.get("/movies", getMovies);
globalRoutes.get("/genres", getGenre);
globalRoutes.get("/movies/:id", getMovieDetail);

export default globalRoutes;
