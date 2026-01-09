import express from "express";
import { OrderController } from "../controllers/order.controller;

const router = express.Router();

const orderController = new OrderController();

// POST /api/order/create
router.post("/create", orderController.createOrder);

export default router;
