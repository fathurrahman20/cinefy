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

export const updateGenre: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      res.status(404).json({
        status: "error",
        message: "Genre not found",
        data: null,
      });
      return;
    }
    const body = genreSchema.parse(req.body);

    const updatedGenre = await Genre.findByIdAndUpdate(genre._id, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Successfully updated genre",
      data: updatedGenre,
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "error",
        message: "Invalid Genre ID",
        data: null,
      });
      return;
    }
    res.status(500).json({
      status: "error",
      message: "Failed to update genre",
      data: null,
    });
  }
};
