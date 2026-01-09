import express from "express";
import { PaymentController } from "../controllers/payment.controller";

const router = express.Router();

const paymentController = new PaymentController();

export default router;
