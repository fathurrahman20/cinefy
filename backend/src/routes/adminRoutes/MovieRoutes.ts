import { Router } from "express";
import { createMovie, getMovies } from "../../controllers/movieController";
import multer from "multer";
import { imageFilter, thumbnailStorage } from "../../utils/multer";

const upload = multer({ storage: thumbnailStorage(), fileFilter: imageFilter });

export const movieRoutes = Router();

movieRoutes.get("/movies", getMovies);
movieRoutes.post("/movies", upload.single("thumbnail"), createMovie);

export default movieRoutes;
