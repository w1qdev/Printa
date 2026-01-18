import { FileUploadOptions, FileUploadResult } from "./file.types";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { config } from "../../config/app.config";

export class FileService {
  private readonly uploadDir = config.fileSystem.uploadDir;

  async uploadFiles({
    userId,
    files,
  }: FileUploadOptions): Promise<FileUploadResult> {
    const uploadPath = path.join(this.uploadDir, userId);

    fs.mkdirSync(uploadPath, { recursive: true });

    for (const file of files) {
      const oldPath = file.path;
      const newPath = path.join(uploadPath, file.originalname);

      fs.renameSync(oldPath, newPath);
    }

    return { path: uploadPath };
  }
}
