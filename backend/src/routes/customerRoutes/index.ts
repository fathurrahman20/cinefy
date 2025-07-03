import { Router } from "express";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";
import globalRoutes from "./globalRoutes";
import walletRoutes from "./walletRoutes";

const customerRoutes = Router();

customerRoutes.use(verifyToken);
customerRoutes.use(verifyRole("customer"));
customerRoutes.use(globalRoutes);
customerRoutes.use(walletRoutes);

export default customerRoutes;
