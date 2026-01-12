import express, { Request, Response } from "express";
import { FileController } from "../controllers/file.controller";
import { uploadFileMiddleware } from "../middleware/file.middleware";

const router = express.Router();

const fileController = new FileController();

// /api/file/upload
router.post("/upload", uploadFileMiddleware, (req: Request, res: Response) =>
  fileController.uploadFiles(req, res),
);

export default router;
