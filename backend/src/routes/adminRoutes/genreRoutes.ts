import { Router } from "express";
import {
  createGenre,
  getGenre,
  getGenres,
  updateGenre,
} from "../../controllers/genreController";
import { validateRequest } from "../../middlewares/validateRequest";
import { genreSchema } from "../../utils/schema";

const genreRoutes = Router();

genreRoutes.get("/genres", getGenres);
genreRoutes.get("/genres/:id", getGenre);
genreRoutes.post("/genres", validateRequest(genreSchema), createGenre);
genreRoutes.put("/genres/:id", validateRequest(genreSchema), updateGenre);

export default genreRoutes;
