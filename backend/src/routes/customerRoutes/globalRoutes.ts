import { Router } from "express";
import {
  getAvailableSeats,
  getGenre,
  getMovieDetail,
  getMovies,
  getMoviesFilter,
} from "../../controllers/globalController";
import { transactionSchema } from "../../utils/schema";
import { transactionTicket } from "../../controllers/ticketController";
import { validateRequest } from "../../middlewares/validateRequest";

const globalRoutes = Router();

globalRoutes.get("/movies", getMovies);
globalRoutes.get("/genres", getGenre);
globalRoutes.get("/movies/:id", getMovieDetail);
globalRoutes.get("/check-seats/:movieId", getAvailableSeats);
globalRoutes.get("/browse-movies/:genreId", getMoviesFilter);
globalRoutes.post(
  "/transaction/buy",
  validateRequest(transactionSchema),
  transactionTicket
);

export default globalRoutes;
