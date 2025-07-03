import { RequestHandler, Response } from "express";
import { CustomRequest } from "../types/Request";
import Wallet from "../models/Wallet";
import WalletTransaction from "../models/WalletTransaction";

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

export const getTopupHistory: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });

    const data = await WalletTransaction.find({
      wallet: wallet?._id,
    }).select("wallet price createdAt status");

    res.status(200).json({
      status: "success",
      message: "Successfully fetched data",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to get data",
      data: null,
    });
  }
};
