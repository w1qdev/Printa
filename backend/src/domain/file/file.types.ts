export type FileUploadOptions = {
  userId: string;
  files: Express.Multer.File[];
};

export type FileUploadResult = {
  path: string;
};
