import type { Request, Response, RequestHandler } from "express";
import User from "../models/User";
import WalletTransaction from "../models/WalletTransaction";
import Transaction from "../models/Transaction";

export const getUsersWithCustomerRole: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userCustomers = await User.find({ role: "customer" }).select(
      "name email"
    );

    res.status(200).json({
      status: "success",
      message: "Successfully fetched users with customer role",
      data: userCustomers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users with customer role",
      data: null,
    });
  }
};

export const getWalletTransactions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const transaction = await WalletTransaction.find().populate({
      path: "wallet",
      select: "user -_id",
      populate: {
        path: "user",
        select: "name",
      },
    });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched wallet transactions",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch wallet transactions",
      data: null,
    });
  }
};

export const getTransactions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const transactions = await Transaction.find()
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "movie",
        select: "title -_id",
      })
      .populate({
        path: "theater",
        select: "name -_id",
      });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched transactions",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch transaction",
      data: null,
    });
  }
};
