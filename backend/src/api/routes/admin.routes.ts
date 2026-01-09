import express from "express";
import { AdminController } from "../controllers/admin.controller";

const router = express.Router();

const adminController = new AdminController();

export default router;
