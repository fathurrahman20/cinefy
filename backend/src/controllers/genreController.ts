import { Request, RequestHandler, Response } from "express";
import Genre from "../models/Genre";
import { genreSchema } from "../utils/schema";

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

export const createGenre: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const body = genreSchema.parse(req.body);

    // const genre = new Genre(body);
    // const newGenre = await genre.save();

    const newGenre = await Genre.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Successfully created genre",
      // data: newGenre,
      data: newGenre,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create genre",
      data: null,
    });
  }
};
