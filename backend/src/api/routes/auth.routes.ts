import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateAuthPayload } from "../middleware/auth.middleware";

const router = express.Router();

const authController = new AuthController();

// POST /api/auth/
router.post("/", validateAuthPayload, authController.register);

export default router;
