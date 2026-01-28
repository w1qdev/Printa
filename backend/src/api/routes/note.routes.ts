import {
  createNoteSchema,
  updateNoteSchema,
} from "@/shared/schemas/note.schemas";
import express, { Request, Response } from "express";
import { NoteService } from "services/note/note.service";
import { ResponseService } from "services/response-handler/response.service";
import { NoteController } from "../controllers/note.controller";
import { validate } from "../middleware/validate.middleware";

const router = express.Router();
const noteController = new NoteController(
  new NoteService(),
  new ResponseService(),
);

router.get("/", (req: Request, res: Response) =>
  noteController.getNotes(req, res),
);

router.post("/", validate(createNoteSchema), (req: Request, res: Response) =>
  noteController.createNote(req, res),
);

router.get("/:id", (req: Request, res: Response) => {
  noteController.getNoteById(req, res);
});

router.put(
  "/:id",
  validate(updateNoteSchema),
  (req: Request, res: Response) => {
    noteController.updateNote(req, res);
  },
);

router.delete("/:id", (req: Request, res: Response) => {
  noteController.deleteNote(req, res);
});
export default router;
