import type { Request, RequestHandler, Response } from "express";
import Movie from "../models/Movie";
import { movieSchema } from "../utils/schema";
import Genre from "../models/Genre";
import Theater from "../models/Theater";
import path from "path";
import fs from "node:fs";
// import cloudinary from "../utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

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

export const createMovie: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      res.status(400).json({
        status: "error",
        message: "No image uploaded, please upload an image",
        data: null,
      });
      return;
    }

    const isGenreExists = await Genre.findById(req.body.genre);
    if (!isGenreExists) {
      res.status(404).json({
        status: "error",
        message: "Genre not found",
        data: null,
      });
      return;
    }

    // Untuk memastikan menghapus whitespace yang mungkin ada di ID
    const theaterIds = req.body.theaters
      .split(",")
      .map((id: string) => id.trim());
    // Untuk validasi apakah setiap ID adalah format ObjectId yang valid
    const invalidTheaterId = theaterIds.find(
      (id: string) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidTheaterId) {
      res.status(400).json({
        status: "error",
        message: `Invalid Theater ID format: ${invalidTheaterId}`,
        data: null,
      });
      return;
    }

    // Operator $in untuk mencari multiple IDs
    const existingTheaters = await Theater.find({
      _id: { $in: theaterIds },
    });
    // Periksa apakah semua theater ID yang diberikan ditemukan
    if (existingTheaters.length !== theaterIds.length) {
      res.status(404).json({
        status: "error",
        message: "One or more theaters not found",
        data: null,
      });
      return;
    }

    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: req.body.genre,
      theaters: theaterIds,
      description: req.body.description,
      price: Number(req.body.price),
      available: req.body.available === "1" ? true : false,
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      const errorMessage = parse.error.issues.map((issue) => issue.message);

      res.status(400).json({
        status: "error",
        message: "Invalid request",
        error: errorMessage,
      });
      return;
    }

    const { public_id, url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "cinefy",
    });

    const newMovie = new Movie({
      title: parse.data.title,
      genre: parse.data.genre,
      theaters: parse.data.theaters,
      description: parse.data.description,
      price: parse.data.price,
      available: parse.data.available,
      bonus: parse.data.bonus,
      thumbnailId: public_id,
      thumbnailUrl: url,
    });

    await newMovie.save();

    res.status(201).json({
      status: "success",
      message: "Successfully created movie",
      data: newMovie,
    });
  } catch (error) {
    console.log(`Errornya: ${error}`);
    res.status(500).json({
      status: "error",
      message: "Failed to create movie",
      data: null,
    });
  }
};

export const updateMovie: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: req.body.genre,
      theaters: req.body.theaters.split(","),
      description: req.body.description,
      price: Number(req.body.price),
      available: req.body.available === "1" ? true : false,
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      const errorMessage = parse.error.issues.map((issue) => issue.message);

      res.status(400).json({
        status: "error",
        message: "Invalid request",
        error: errorMessage,
      });
      return;
    }

    const isGenreExists = await Genre.findById(req.body.genre);
    if (!isGenreExists) {
      res.status(404).json({
        status: "error",
        message: "Genre not found",
        data: null,
      });
      return;
    }

    // Untuk membersihkan whitespace yang mungkin ada di ID
    const theaterIds = req.body.theaters
      .split(",")
      .map((id: string) => id.trim());
    // Untuk validasi apakah setiap ID adalah format ObjectId yang valid
    const invalidTheaterId = theaterIds.find(
      (id: string) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidTheaterId) {
      res.status(400).json({
        status: "error",
        message: `Invalid Theater ID format: ${invalidTheaterId}`,
        data: null,
      });
      return;
    }

    // Operator $in untuk mencari multiple IDs
    const existingTheaters = await Theater.find({
      _id: { $in: theaterIds },
    });
    // Periksa apakah semua theater ID yang diberikan ditemukan
    if (existingTheaters.length !== theaterIds.length) {
      res.status(404).json({
        status: "error",
        message: "One or more theaters not found",
        data: null,
      });
      return;
    }

    const oldMovie = await Movie.findById(id);

    if (!oldMovie) {
      res.status(404).json({
        status: "error",
        message: "Movie not found",
        data: null,
      });
      return;
    }

    if (req.file) {
      await cloudinary.uploader.destroy(oldMovie.thumbnailId);
      const { public_id, url } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "cinefy",
        }
      );
      oldMovie.thumbnailId = public_id;
      oldMovie.thumbnailUrl = url;
    }

    // Note: Dibutuhkan jika ingin menyimpan di local: public/uploads/thumbnails
    // if (!req.file) {
    //   const dirname = path.resolve();
    //   const filepath = path.join(
    //     dirname,
    //     "public/uploads/thumbnails",
    //     oldMovie.thumbnail!
    //   );

    //   if (fs.existsSync(filepath)) {
    //     fs.unlinkSync(filepath);
    //   }
    // }

    await Genre.findByIdAndUpdate(oldMovie.genre, {
      $pull: { movies: oldMovie._id },
    });

    for (const theater of oldMovie.theaters) {
      await Theater.findByIdAndUpdate(theater._id, {
        $pull: { movies: oldMovie._id },
      });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      oldMovie._id,
      {
        title: parse.data.title,
        genre: parse.data.genre,
        available: parse.data.available,
        theaters: parse.data.theaters,
        thumbnailId: oldMovie.thumbnailId,
        thumbnailUrl: oldMovie.thumbnailUrl,
        description: parse.data.description,
        price: parse.data.price,
        bonus: parse.data.bonus,
      },
      { new: true, runValidators: true }
    );

    await Genre.findByIdAndUpdate(parse.data.genre, {
      $push: { movies: id },
    });

    for (const theater of parse.data.theaters) {
      await Theater.findByIdAndUpdate(theater, {
        $push: { movies: id },
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated movie",
      data: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update data",
      data: null,
      status: "failed",
    });
  }
};

export const getMovie: RequestHandler = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);
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
      message: "Successfully fetched movie",
      data: movie,
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
      message: "Failed to fetch movie",
      data: null,
    });
  }
};
