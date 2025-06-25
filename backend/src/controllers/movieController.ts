import type { Request, RequestHandler, Response } from "express";
import Movie from "../models/Movie";

export const getMovies: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const Movies = await Movie.find()
      .populate({
        path: "genre",
        select: "name",
      })
      .populate({
        path: "theaters",
        select: "name",
      });
    res.status(200).json({
      status: "success",
      message: "Successfully fetched Movie",
      data: Movies,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch Movie",
      data: null,
    });
  }
};
