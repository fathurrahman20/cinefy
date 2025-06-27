import { Request, RequestHandler, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";

export const getMovies: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await Movie.find()
      .select("title thumbnailUrl")
      .populate({
        path: "genre",
        select: "name",
      })
      .limit(3);
    res.status(200).json({
      status: "success",
      message: "Successfully fetched movies",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch movies",
      data: null,
    });
  }
};

export const getGenre: RequestHandler = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find().select("name").limit(3);

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
