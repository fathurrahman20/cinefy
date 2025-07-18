import { Request, RequestHandler, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Transaction from "../models/Transaction";
import Theater from "../models/Theater";

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

export const getAvailableSeats: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { movieId } = req.params;
    const { date } = req.query;

    const transactions = await Transaction.find({
      date: date?.toString().replace("+", " "),
      movie: movieId,
    })
      .select("seats")
      .populate({
        path: "seats",
        select: "seat",
      });

    const seats = [];

    for (const transaction of transactions) {
      seats.push(...transaction.seats);
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched available seats",
      data: seats,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch available seats",
      data: null,
    });
  }
};

export const getMoviesFilter: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { genreId } = req.params;
    const { city, theaters, available } = req.query;

    let filterQuery: any = {};

    if (genreId) {
      filterQuery = {
        ...filterQuery,
        genre: genreId,
      };
    }

    if (city) {
      const theatersList = await Theater.find({
        city: city,
      });

      const theaterIds = theatersList.map((theater) => theater.id);

      filterQuery = {
        ...filterQuery,
        theaters: {
          $in: [...theaterIds],
        },
      };
    }

    if (theaters) {
      const theaterIds2 = theaters as string[];

      filterQuery = {
        ...filterQuery,
        theaters: {
          $in: [...(filterQuery?.theaters.$in ?? []), theaterIds2],
        },
      };
    }

    if (available === "true") {
      filterQuery = {
        ...filterQuery,
        available: true,
      };
    }

    const data = await Movie.find({
      ...filterQuery,
    })
      .select("title genre thumbnailUrl")
      .populate({
        path: "genre",
        select: "name",
      });

    const allData = await Movie.find()
      .select("title genre theaters thumbnailUrl")
      .populate({
        path: "genre",
        select: "name",
      })
      .populate({
        path: "theaters",
        select: "city",
      });

    res.json({
      status: true,
      message: "success get filtered movies",
      data: {
        filteredMovies: data,
        allMovies: allData,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Failed to fetch filtered movies",
      data: null,
    });
  }
};
