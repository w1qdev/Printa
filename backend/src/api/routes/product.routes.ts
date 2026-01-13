import express, { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = express.Router();

const productController = new ProductController();

// POST /api/product
router.post("/", jwtMiddleware, (req: Request, res: Response) =>
  productController.createProduct(req, res),
);
// GET /api/product/:productId
router.get("/:productId", (req: Request, res: Response) =>
  productController.getProduct(req, res),
);
// GET /api/product
router.get("/", (req: Request, res: Response) =>
  productController.getProducts(req, res),
);
// PUT /api/product/:productId
router.put("/:productId", jwtMiddleware, (req: Request, res: Response) =>
  productController.updateProduct(req, res),
);
// DELETE /api/product/:productId
router.delete("/:productId", jwtMiddleware, (req: Request, res: Response) =>
  productController.updateProduct(req, res),
);

export default router;
