import { NextFunction, Request, RequestHandler, Response } from "express";
import type z from "zod";
import { ZodError } from "zod";

export const validateRequest =
  (schema: z.AnyZodObject): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues.map((issue) => issue.message);

        res.status(400).json({
          status: "error",
          error: "Invalid request",
          message: errorMessage,
        });
      }
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  };
