import { RequestHandler, Response } from "express";
import { transactionSchema } from "../utils/schema";
import Wallet from "../models/Wallet";
import { CustomRequest } from "../types/Request";
import Transaction from "../models/Transaction";
import TransactionSeat from "../models/TransactionSeat";

export const transactionTicket: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const parse = transactionSchema.parse(req.body);

    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });

    if (!wallet || (wallet && wallet.balance < parse.total)) {
      res.status(400).json({
        status: "error",
        message: "Insufficient balance. Please top up your wallet",
        data: null,
      });
      return;
    }

    const transaction = new Transaction({
      bookingFee: parse.bookingFee,
      total: parse.total,
      subtotal: parse.subtotal,
      theater: parse.theaterId,
      movie: parse.movieId,
      tax: parse.tax,
      user: req.user?.id,
      date: parse.date,
    });

    for (const seat of parse.seats) {
      const newSeat = new TransactionSeat({
        transaction: transaction._id,
        seat: seat,
      });
      await newSeat.save();
    }

    const transactionSeats = await TransactionSeat.find({
      transaction: transaction._id,
    });

    transaction.seats = transactionSeats.map((seat) => seat._id);

    await transaction.save();
    await Wallet.updateOne(
      {
        _id: wallet._id,
      },
      {
        $inc: {
          balance: -parse.total,
        },
      }
    );
    // or
    // const currBalance = wallet.balance ?? 0;

    // 	await Wallet.findByIdAndUpdate(wallet.id, {
    // 		balance: currBalance - parse.total,
    // 	});

    res.status(201).json({
      status: "success",
      message: "Successfully created transaction",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create transaction",
      data: null,
    });
  }
};

export const getOrders: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const transactions = await Transaction.find({
      user: req.user?.id,
    })
      .select("seats movie theater date status")
      .populate({
        path: "movie",
        select: "thumbnail title genre -_id",
        populate: {
          path: "genre",
          select: "name -_id",
        },
      })
      .populate({
        path: "seats",
        select: "seat -_id",
      })
      .populate({
        path: "theater",
        select: "name city -_id",
      });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched transactions",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch transactions",
      data: null,
    });
  }
};

export const getOrderDetail: RequestHandler = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id)

      .populate({
        path: "movie",
        select: "thumbnail price bonus title genre -_id",
        populate: {
          path: "genre",
          select: "name -_id",
        },
      })
      .populate({
        path: "seats",
        select: "seat -_id",
      })
      .populate({
        path: "theater",
        select: "name city -_id",
      });

    res.status(200).json({
      status: "success",
      message: "Successfully fetched transaction",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch transaction",
      data: null,
    });
  }
};
