import { Request, RequestHandler, Response } from "express";
import { CustomRequest } from "../types/Request";
import Wallet from "../models/Wallet";
import WalletTransaction from "../models/WalletTransaction";
import { topupSchema } from "../utils/schema";

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

export const topupBalance: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const parse = topupSchema.parse(req.body);

    const midtransUrl = process.env.MIDTRANS_TRANSACTION_URL!;
    const midtransAuth = process.env.MIDTRANS_AUTH_STRING!;

    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });

    const topup = new WalletTransaction({
      wallet: wallet?.id,
      price: parse.balance,
      status: "pending",
    });

    const midtransRequest = new Request(midtransUrl, {
      method: "POST",
      body: JSON.stringify({
        transaction_details: {
          order_id: topup.id,
          gross_amount: parse.balance,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user?.email,
        },
        callbacks: {
          finish: process.env.SUCCESS_PAYMENT_REDIRECT!,
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `BASIC ${midtransAuth}`,
      },
    });

    const midtransResponse = await fetch(midtransRequest);
    const data = await midtransResponse.json();

    await topup.save();

    res.status(200).json({
      status: "success",
      message: "Successfully topup balance",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to topup balance",
      data: null,
    });
  }
};

interface TopupRequestBody {
  order_id: string;
  transaction_status: string;
  // Add other properties if they exist in the body
}

export const handleTopupBalance: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (
      !req.body ||
      typeof req.body.order_id === "undefined" ||
      typeof req.body.transaction_status === "undefined"
    ) {
      res.status(400).json({ status: false, message: "Invalid request body" });
      return;
    }

    const body = req.body as TopupRequestBody;

    const orderId = body.order_id;

    switch (body.transaction_status) {
      case "capture":
      case "settlement": {
        const walletTransaction = await WalletTransaction.findById(orderId);
        const wallet = await Wallet.findById(walletTransaction?.wallet);

        await WalletTransaction.findByIdAndUpdate(orderId, {
          status: "success",
        });

        const currentBalance = wallet?.balance ?? 0;
        const additionalBalance = walletTransaction?.price ?? 0;

        await Wallet.findByIdAndUpdate(wallet?.id, {
          balance: currentBalance + additionalBalance,
        });

        break;
      }

      case "deny":
      case "cancel":
      case "expire":
      case "failure": {
        await WalletTransaction.findByIdAndUpdate(orderId, {
          status: "failed",
        });

        break;
      }

      default:
        break;
    }

    res.json({ status: true });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "An internal server error occurred." });
  }
};
