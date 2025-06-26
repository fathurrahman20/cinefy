import { Router } from "express";
import { getUsersWithCustomerRole } from "../../controllers/userController";

const userRoutes = Router();

userRoutes.get("/users", getUsersWithCustomerRole);

export default userRoutes;
