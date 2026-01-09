import express from "express";
import { ProductController } from "../controllers/product.controller";

const router = express.Router();

const productController = new ProductController();

// POST /api/product
router.post("/", productController.createProduct);
// GET /api/product/:productId
router.get("/:productId", productController.getProduct);
// GET /api/product
router.get("/", productController.getProducts);
// PUT /api/product/:productId
router.put("/:productId", productController.updateProduct);
// DELETE /api/product/:productId
router.delete("/:productId", productController.updateProduct);

export default router;
