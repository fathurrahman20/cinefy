import { Router } from "express";
import { getGenres } from "../../controllers/genreController";

const genreRoutes = Router();

genreRoutes.get("/genres", getGenres);

export default genreRoutes;
