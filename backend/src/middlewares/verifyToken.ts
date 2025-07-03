import type { NextFunction, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { CustomRequest } from "../types/Request";

type JWTPayload = {
  data: { id: string };
};

export const verifyToken: RequestHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const secretKey = process.env.JWT_SECRET_KEY!;

  try {
    if (req.headers?.authorization?.split(" ")[0] === "JWT") {
      const token = req.headers?.authorization?.split(" ")[1];
      const decoded = (await jwt.verify(token, secretKey)) as JWTPayload;

      const user = await User.findById(decoded.data.id);

      if (!user) {
        res.status(401).json({
          message: "Token invalid",
        });
        return;
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next();
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "Token expired",
      });
      return;
    }
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const verifyRole =
  (type: "admin" | "customer"): RequestHandler =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req?.user?.role === type) {
      next();

      return;
    }

    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  };
