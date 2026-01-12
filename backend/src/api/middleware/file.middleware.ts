import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const uploadFileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const MAX_UPLOAD_SIZE = 50 * 1024 * 1024;
  const MAX_UPLOAD_FILES = 10;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

  const upload = multer({
    dest: "/uploads",
    limits: { fileSize: MAX_UPLOAD_SIZE },
    fileFilter: (req, file, cb) => {
      if (!ALLOWED_TYPES.includes(file.mimetype)) {
        cb(new Error(`Неподдерживаемый тип файла: ${file.mimetype}`));
        return;
      }
      cb(null, true);
    },
  });

  upload.array("files", MAX_UPLOAD_FILES)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      }
      // Ошибки из fileFilter
      return res.status(400).json({ error: err.message });
    }

    // Дополнительная валидация
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Не загружено ни одного файла" });
    }

    next();
  });
};
