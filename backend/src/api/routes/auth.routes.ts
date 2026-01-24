import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../../services/auth/auth.service";
import { ResponseService } from "services/response-handler/response.service";
import { validateAuthPayload } from "../middleware/auth.middleware";

const router = express.Router();

const authController = new AuthController(
  new AuthService(),
  new ResponseService(),
);

// POST /api/auth/register
router.post("/register", validateAuthPayload, (req: Request, res: Response) =>
  authController.register(req, res),
);
// POST /api/auth/login
router.post("/login", validateAuthPayload, (req: Request, res: Response) =>
  authController.login(req, res),
);
// GET /api/auth/logout
// router.get("/logout", (req: Request, res: Response) =>
//   authController.logout(req, res),
// );

export default router;
