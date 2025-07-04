import { Router } from "express";
import {
  getBalance,
  getTopupHistory,
  topupBalance,
} from "../../controllers/walletController";
import { validateRequest } from "../../middlewares/validateRequest";
import { topupSchema } from "../../utils/schema";

const walletRoutes = Router();

walletRoutes.get("/check-balance", getBalance);
walletRoutes.get("/topup-history", getTopupHistory);
walletRoutes.post("/top-up", validateRequest(topupSchema), topupBalance);

export default walletRoutes;
