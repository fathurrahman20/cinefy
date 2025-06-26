import { Router } from "express";
import {
  getUsersWithCustomerRole,
  getWalletTransactions,
} from "../../controllers/userController";

const userRoutes = Router();

userRoutes.get("/users", getUsersWithCustomerRole);
userRoutes.get("/wallet-transaction", getWalletTransactions);

export default userRoutes;
