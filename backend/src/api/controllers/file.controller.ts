import { Request, Response } from "express";
import { FileService } from "../../domain/file/file.service";

export class FileController {
  private readonly fileService: FileService = new FileService();

  async uploadFiles(req: Request, res: Response) {
    try {
      const userId = req.body.userId as string;
      const files = req.files as Express.Multer.File[];

      const movedFiles = await this.fileService.uploadFiles({
        userId,
        files,
      });

      res.status(200).json({
        message: "Файлы успешно загружены",
        files: movedFiles,
      });
    } catch (error) {
      console.error("Ошибка при загрузке файлов:", error);
      res.status(500).json({
        message: "Ошибка при загрузке файлов",
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
      });
    }
  }
}
