import { Request, RequestHandler, Response } from "express";
import Theater from "../models/Theater";
import { theaterSchema } from "../utils/schema";

export const getTheaters: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json({
      status: "success",
      message: "Successfully fetched theaters",
      data: theaters,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch theaters",
      data: null,
    });
  }
};

export const createTheater: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const body = theaterSchema.parse(req.body);

    const newTheater = await Theater.create(body);
    res.status(201).json({
      status: "success",
      message: "Successfully created theater",
      data: newTheater,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create theater",
      data: null,
    });
  }
};

export const getTheater: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      res.status(404).json({
        status: "error",
        message: "Theater not found",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched theater",
      data: theater,
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "error",
        message: "Invalid Theater ID",
        data: null,
      });
      return;
    }
    res.status(500).json({
      status: "error",
      message: "Failed to fetched theater",
      data: null,
    });
  }
};

export const updateTheater: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      res.status(404).json({
        status: "error",
        message: "Theater not found",
        data: null,
      });
      return;
    }
    const body = theaterSchema.parse(req.body);

    const updatedTheater = await Theater.findByIdAndUpdate(theater._id, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Successfully updated theater",
      data: updatedTheater,
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "error",
        message: "Invalid Theater ID",
        data: null,
      });
      return;
    }
    res.status(500).json({
      status: "error",
      message: "Failed to update theater",
      data: null,
    });
  }
};

export const deleteTheater: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      res.status(404).json({
        status: "error",
        message: "Theater not found",
        data: null,
      });
    }

    await Theater.findByIdAndDelete(theater?._id);
    res.status(200).json({
      status: "success",
      message: "Successfully deleted theater",
      data: null,
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "error",
        message: "Invalid Theater ID",
        data: null,
      });
    }
    res.status(500).json({
      status: "error",
      message: "Failed to delete theater",
      data: null,
    });
  }
};
