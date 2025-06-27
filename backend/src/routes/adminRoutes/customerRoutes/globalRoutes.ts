import { Router } from "express";
import { getGenre, getMovies } from "../../../controllers/globalController";

const globalRoutes = Router();

globalRoutes.get("/movies", getMovies);
globalRoutes.get("/genres", getGenre);

export default globalRoutes;
