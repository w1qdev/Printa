import express, { Request, Response } from "express";
import { FileController } from "../controllers/file.controller";
import { uploadFileMiddleware } from "../middleware/file.middleware";
import { jwtMiddleware } from "../middleware/jwt.middleware";
import { FileService } from "services/file/file.service";

const router = express.Router();

const fileController = new FileController(new FileService());

// /api/file/upload
router.post(
  "/upload",
  jwtMiddleware,
  uploadFileMiddleware,
  (req: Request, res: Response) => fileController.uploadFiles(req, res),
);

export default router;
