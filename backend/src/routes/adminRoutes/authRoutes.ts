import { Router } from "express";
import { login, register } from "../../controllers/authController";
import { validateRequest } from "../../middlewares/validateRequest";
import { authSchema } from "../../utils/schema";

const authRoutes = Router();

authRoutes.post(
  "/auth/login",
  validateRequest(authSchema.omit({ name: true })),
  login
);

authRoutes.post("/auth/register", register);

export default authRoutes;
