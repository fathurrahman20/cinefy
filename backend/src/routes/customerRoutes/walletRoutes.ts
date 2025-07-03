import { Router } from "express";
import { getBalance } from "../../controllers/walletController";

const walletRoutes = Router();

walletRoutes.get("/check-balance", getBalance);

export default walletRoutes;
