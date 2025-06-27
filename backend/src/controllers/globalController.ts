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

export const getMovieDetail: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const seats = [];

    // create 5 seats for each row
    for (let i = 0; i < 5; i++) {
      seats.push({
        seat: `A${i + 1}`,
        isBooked: false,
      });
    }

    for (let i = 0; i < 5; i++) {
      seats.push({
        seat: `B${i + 1}`,
        isBooked: false,
      });
    }

    for (let i = 0; i < 5; i++) {
      seats.push({
        seat: `C${i + 1}`,
        isBooked: false,
      });
    }

    const movie = await Movie.findById(req.params.id)
      .populate({
        path: "genre",
        select: "name -_id",
      })
      .populate({
        path: "theaters",
        select: "name city",
      });

    if (!movie) {
      res.status(404).json({
        status: "error",
        message: "Movie not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched movie detail",
      data: {
        movie: {
          ...movie?.toJSON(),
        },
        seats,
        times: ["10:00", "12:00", "14:00", "16:00", "19:00"],
      },
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "error",
        message: "Invalid Movie ID",
        data: null,
      });
      return;
    }
    res.status(500).json({
      status: "error",
      message: "Failed to fetch movie detail",
      data: null,
    });
  }
};
