import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be at most 5000 characters"),
});

export const updateNoteSchema = z
  .object({
    title: z.string().min(1).max(100).optional(),
    content: z.string().min(1).max(5000).optional(),
  })
  .refine((data) => data.title || data.content, {
    message: "At least one field must be provided",
  });
