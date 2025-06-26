import type { Request, Response, RequestHandler } from "express";
import User from "../models/User";

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
