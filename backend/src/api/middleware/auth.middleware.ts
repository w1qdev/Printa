import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const validateAuthPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = registerSchema.safeParse(req.body ?? {});

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return res.status(400).json({
      status: "error",
      data: {
        message: firstIssue?.message ?? "Invalid credentials payload",
      },
    });
  }

  req.body = parsed.data;
  next();
};
