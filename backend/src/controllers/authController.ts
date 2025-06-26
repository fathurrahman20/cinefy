import { Request, RequestHandler, Response } from "express";
import { authSchema } from "../utils/schema";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const parse = authSchema.omit({ name: true }).parse(req.body);

    const checkUser = await User.findOne({
      email: parse.email,
      role: parse.role,
    });

    if (!checkUser) {
      res.status(400).json({
        status: "error",
        message: "Invalid credentials",
        data: null,
      });
      return;
    }

    const comparePassword = bcrypt.compareSync(
      parse.password,
      checkUser.password
    );

    if (!comparePassword) {
      res.status(400).json({
        status: "error",
        message: "Invalid credentials",
        data: null,
      });
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY!;

    const token = jwt.sign(
      {
        data: {
          id: checkUser._id,
        },
      },
      secretKey,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to login",
      data: null,
    });
  }
};
