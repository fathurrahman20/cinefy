import { Router } from "express";
import { createGenre, getGenres } from "../../controllers/genreController";
import { validateRequest } from "../../middlewares/validateRequest";
import { genreSchema } from "../../utils/schema";

const genreRoutes = Router();

genreRoutes.get("/genres", getGenres);
genreRoutes.post("/genres", validateRequest(genreSchema), createGenre);

export default genreRoutes;
