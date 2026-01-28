import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        title: req.body.title,
        content: req.body.content,
      });
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
        });
      }
      next(error);
    }
  };
};
