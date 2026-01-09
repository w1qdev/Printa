import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

const userController = new UserController();

// POST /api/user/refresh-password
router.post("/refresh-password", userController.refreshPassword);
// GET /api/user/:email
router.get("/:email", userController.getUserByEmail);
// GET /api/user
router.get("/", userController.getAllUsers);

export default router;
