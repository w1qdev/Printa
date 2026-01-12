export type FileUploadOptions = {
  userId: string;
  fileName: string;
  fileMimeType: string;
  fileSize: number;
  fileBuffer: Buffer;
};
