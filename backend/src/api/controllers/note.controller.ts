import { InternalServerError } from "@/shared/utils/errors";
import { logger } from "@/shared/utils/logger";
import { Request, Response } from "express";
import { NoteService } from "services/note/note.service";
import { ResponseService } from "services/response-handler/response.service";

export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly responseService: ResponseService,
  ) {}

  async getNotes(req: Request, res: Response) {
    try {
      const notes = await this.noteService.getNotes();

      return this.responseService.sendMessageNotification(res, notes);
    } catch (error) {
      logger.error("Error fetching notes:", error);

      throw new InternalServerError();
    }
  }

  async createNote(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const newNote = await this.noteService.createNote({ title, content });

      return this.responseService.sendMessageNotification(res, newNote);
    } catch (error) {
      logger.error("Error creating note", error);

      throw new InternalServerError();
    }
  }

  async getNoteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const note = await this.noteService.getNotesById(id);

      return this.responseService.sendMessageNotification(res, note);
    } catch (error) {
      logger.error("Error getting note by id", error);

      throw new InternalServerError();
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const updatedNote = await this.noteService.updateNote(id, {
        title,
        content,
      });

      return this.responseService.sendMessageNotification(res, updatedNote);
    } catch (error) {
      logger.error("Error with updating note", error);

      throw new InternalServerError();
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedNote = await this.noteService.deleteNote(id);

      return this.responseService.sendMessageNotification(res, deletedNote);
    } catch (error) {
      logger.error("Error with updating note", error);

      throw new InternalServerError();
    }
  }
}
