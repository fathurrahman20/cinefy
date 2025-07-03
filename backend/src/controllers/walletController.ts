import { RequestHandler, Response } from "express";
import { CustomRequest } from "../types/Request";
import Wallet from "../models/Wallet";

export const getBalance: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user?.id });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched balance",
      data: {
        balance: wallet?.balance ?? 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch balance",
      data: null,
    });
  }
};
