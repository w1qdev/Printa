import { FileUploadOptions } from "./file.types";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export class FileService {
  private readonly uploadDir = "uploads";

  async uploadFiles({
    userId,
    fileName,
    fileMimeType,
    fileSize,
    fileBuffer,
  }: FileUploadOptions): Promise<string> {
    const userDir = path.join(this.uploadDir, userId);
    await fs.mkdir(userDir, { recursive: true });

    const ext = path.extname(fileName);
    const nameWithoutExt = path.basename(fileName, ext);
    const uniqueFilename = `${nameWithoutExt}-${Date.now()}-${uuidv4()}${ext}`;

    const filePath = path.join(userDir, uniqueFilename);

    await fs.writeFile(filePath, fileBuffer);

    return path.join(userId, uniqueFilename);
  }
}
