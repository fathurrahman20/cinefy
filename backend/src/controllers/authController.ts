import { Request, RequestHandler, Response } from "express";
import { authSchema } from "../utils/schema";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Wallet from "../models/Wallet";

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

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const parse = authSchema.omit({ role: true }).safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (issue) => `${issue.path}: ${issue.message}`
      );
      res.status(400).json({
        status: "error",
        message: "Invalid request",
        data: errorMessage,
      });
      return;
    }

    const emailExists = await User.findOne({ email: parse.data.email });

    if (emailExists) {
      res.status(400).json({
        status: "error",
        message: "Email already exists",
        data: null,
      });
      return;
    }

    const hashPassword = bcrypt.hashSync(parse.data.password, 12);

    const newUser = new User({
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      role: "customer",
    });

    const wallet = new Wallet({
      user: newUser._id,
      balance: 0,
    });

    await newUser.save();
    await wallet.save();

    res.status(201).json({
      status: "success",
      message: "Successfully registered",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to register",
      data: null,
    });
  }
};
