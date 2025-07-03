import { Router } from "express";
import {
  getBalance,
  getTopupHistory,
} from "../../controllers/walletController";

const walletRoutes = Router();

walletRoutes.get("/check-balance", getBalance);
walletRoutes.get("/topup-history", getTopupHistory);

export default walletRoutes;
