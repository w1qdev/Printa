import express from "express";
import { OrderController } from "../controllers/order.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = express.Router();

const orderController = new OrderController();

// POST /api/order/create
router.post("/create", jwtMiddleware, orderController.createOrder);

export default router;
