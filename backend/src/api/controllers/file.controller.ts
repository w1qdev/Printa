import { Request, Response } from "express";
import { FileService } from "../../domain/file/file.service";

export class FileController {
  private readonly fileService: FileService = new FileService();

  async uploadFiles(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const files = req.files;

      console.log(files);

      const uploadedFiles = await Promise.all(
        files.map(async (file: Express.Multer.File) => {
          const { originalname, mimetype, size, buffer } = file;

          const filePath = await this.fileService.uploadFiles({
            userId,
            fileName: originalname,
            fileMimeType: mimetype,
            fileSize: size,
            fileBuffer: buffer,
          });

          return { originalname, mimetype, size, filePath };
        }),
      );

      res.status(200).json({
        message: "Файлы успешно загружены",
        files: uploadedFiles,
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
