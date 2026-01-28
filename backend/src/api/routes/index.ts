import express from "express";
import adminRouter from "./admin.routes";
import authRouter from "./auth.routes";
import fileRouter from "./file.routes";
import noteRouter from "./note.routes";
import orderRouter from "./order.routes";
import paymentRouter from "./payment.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/payment", paymentRouter);
router.use("/file", fileRouter);
router.use("/notes", noteRouter);

export default router;
