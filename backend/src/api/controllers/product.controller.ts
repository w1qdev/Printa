import { Request, Response } from "express";
import { logger } from "@/shared/utils/logger";

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
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
