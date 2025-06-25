import { Router } from "express";
import {
  createGenre,
  getGenres,
  updateGenre,
} from "../../controllers/genreController";
import { validateRequest } from "../../middlewares/validateRequest";
import { genreSchema } from "../../utils/schema";

const genreRoutes = Router();

genreRoutes.get("/genres", getGenres);
genreRoutes.post("/genres", validateRequest(genreSchema), createGenre);
genreRoutes.put("/genres/:id", validateRequest(genreSchema), updateGenre);

export default genreRoutes;
