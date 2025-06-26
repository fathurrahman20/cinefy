import { Router } from "express";
import {
  getTransactions,
  getUsersWithCustomerRole,
  getWalletTransactions,
} from "../../controllers/userController";

const userRoutes = Router();

userRoutes.get("/users", getUsersWithCustomerRole);
userRoutes.get("/wallet-transaction", getWalletTransactions);
userRoutes.get("/ticket-transaction", getTransactions);

export default userRoutes;
