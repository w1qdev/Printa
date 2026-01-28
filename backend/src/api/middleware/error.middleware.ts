import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/utils/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Если это наша кастомная ошибка
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({
    error: {
      message: "Internal server error",
      statusCode: 500,
    },
  });
};
