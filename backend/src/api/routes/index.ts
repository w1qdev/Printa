import express from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import adminRouter from "./admin.routes";
import orderRouter from "./order.routes";
import productRouter from "./product.routes";
import paymentRouter from "./payment.routes";
import fileRouter from "./file.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/payment", paymentRouter);
router.use("/file", fileRouter);

export default router;
