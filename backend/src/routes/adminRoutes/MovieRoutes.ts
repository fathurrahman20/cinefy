import { Router } from "express";
import { getMovies } from "../../controllers/movieController";

export const movieRoutes = Router();

movieRoutes.get("/movies", getMovies);

export default movieRoutes;
