import express from "express";
import genreRoutes from "./genreRoutes";
import theaterRoutes from "./theaterRoutes";
import movieRoutes from "./MovieRoutes";
import userRoutes from "./userRoutes";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";

const adminRoutes = express.Router();

adminRoutes.use(verifyToken);
adminRoutes.use(verifyRole("admin"));
adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoutes);
adminRoutes.use(movieRoutes);
adminRoutes.use(userRoutes);

export default adminRoutes;
