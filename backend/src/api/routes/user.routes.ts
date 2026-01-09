import express, { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

const userController = new UserController();

// GET /api/user
router.get("/", (req: Request, res: Response) =>
  userController.getAllUsers(req, res),
);
// GET /api/user/:email
router.get("/:email", (req: Request, res: Response) =>
  userController.getUserByEmail(req, res),
);
// POST /api/user/refresh-password
router.post("/refresh-password", (req: Request, res: Response) =>
  userController.refreshPassword(req, res),
);

export default router;
