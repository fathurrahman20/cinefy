import { Router } from "express";
import {
  createMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "../../controllers/movieController";
import multer from "multer";
import { imageFilter, upload } from "../../utils/multer";
import { v2 as cloudinary } from "cloudinary";

// const upload = multer({ storage: thumbnailStorage(), fileFilter: imageFilter });

export const movieRoutes = Router();

movieRoutes.use(async (req, res, next) => {
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  next();
});

movieRoutes.get("/movies", getMovies);
movieRoutes.get("/movies/:id", getMovie);
movieRoutes.post("/movies", upload.single("thumbnail"), createMovie);
movieRoutes.put("/movies/:id", upload.single("thumbnail"), updateMovie);

export default movieRoutes;
