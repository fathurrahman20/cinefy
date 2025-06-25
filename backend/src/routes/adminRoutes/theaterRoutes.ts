import { Router } from "express";
import {
  createTheater,
  deleteTheater,
  getTheater,
  getTheaters,
  updateTheater,
} from "../../controllers/theaterController";
import { validateRequest } from "../../middlewares/validateRequest";
import { theaterSchema } from "../../utils/schema";

const theaterRoutes = Router();

theaterRoutes.get("/theaters", getTheaters);
theaterRoutes.get("/theaters/:id", getTheater);
theaterRoutes.post("/theaters", validateRequest(theaterSchema), createTheater);
theaterRoutes.put(
  "/theaters/:id",
  validateRequest(theaterSchema),
  updateTheater
);
theaterRoutes.delete("/theaters/:id", deleteTheater);

export default theaterRoutes;
