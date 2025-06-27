import { Router } from "express";
import { verifyRole, verifyToken } from "../../../middlewares/verifyToken";
import globalRoutes from "./globalRoutes";

const customerRoutes = Router();

customerRoutes.use(verifyToken);
customerRoutes.use(verifyRole("customer"));
customerRoutes.use(globalRoutes);

export default customerRoutes;
