import { Request, RequestHandler, Response } from "express";
import Genre from "../models/Genre";

export const getGenres: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({
      status: "success",
      message: "Successfully fetched genres",
      data: genres,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch genres",
      data: null,
    });
  }
};
