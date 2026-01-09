import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateAuthPayload } from "../middleware/auth.middleware";

const router = express.Router();

const authController = new AuthController();

// POST /api/auth/register
router.post("/register", validateAuthPayload, authController.register);
// POST /api/auth/login
router.post("/login", validateAuthPayload, authController.login);

// GET /api/auth/logout
router.get("/logout", authController.logout);

export default router;
