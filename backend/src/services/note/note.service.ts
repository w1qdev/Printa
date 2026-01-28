import { NotFoundError } from "@/shared/utils/errors";
import { prisma } from "../../prisma";
import { CreateNotePayload } from "./note.types";

export class NoteService {
  async getNotes() {
    const notes = await prisma.note.findMany();

    return notes;
  }

  async createNote(data: CreateNotePayload) {
    const newNote = await prisma.note.create({
      data,
    });

    return newNote;
  }

  async getNotesById(id: string) {
    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    return note;
  }

  async updateNote(id: string, data: { title?: string; conent?: string }) {
    const updatedNote = await prisma.note.update({
      where: { id },
      data,
    });

    if (!updatedNote) {
      throw new NotFoundError("Note not found");
    }

    return updatedNote;
  }

  async deleteNote(id: string) {
    const deletedNote = await prisma.note.delete({
      where: { id },
    });

    if (!deletedNote) {
      throw new NotFoundError("Note not found");
    }

    return deletedNote;
  }
}
