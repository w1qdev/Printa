import { Request, Response } from "express";
import { logger } from "@/shared/utils/logger";
import { ProductService } from "@/domain/product/product.service";

export class ProductController {
  private productService = new ProductService();

  async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;

      const product = await this.productService.createProduct({
        name,
        description,
        price,
      });

      const responseResult = {
        status: "ok",
        data: {
          product,
        },
      };

      return res.status(201).json(responseResult);
    } catch (err) {
      logger.error("Error with creating product");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await this.productService.getProduct(productId);

      const responseResult = {
        status: "ok",
        data: {
          product,
        },
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with getting product");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.getProducts();

      const responseResult = {
        status: "ok",
        data: {
          products,
        },
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with getting products");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const { name, description, price } = req.body;

      const product = await this.productService.updateProduct({
        id: productId,
        name,
        description,
        price,
      });

      const responseResult = {
        status: "ok",
        data: {
          product,
        },
      };

      return res.status(200).json(responseResult);
    } catch (err) {
      logger.error("Error with updating product");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }
  async deleteProduct(req: Request, res: Response) {
    try {
    } catch (err) {
      logger.error("Error with deleting product");

      const responseResult = {
        status: "error",
        data: {
          message: "some internal error",
        },
      };

      return res.status(500).json(responseResult);
    }
  }
}
