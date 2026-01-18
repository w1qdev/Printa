import { PrivateResultType } from "@prisma/client/runtime/client";
import { prisma } from "../../prisma";
import {
  CreateProductParamsTypes,
  UpdateProductParamsTypes,
} from "./product.types";

export class ProductService {
  async createProduct({ name, description, price }: CreateProductParamsTypes) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });

    return product;
  }

  async deleteProduct(productId: string) {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return product;
  }

  async getProduct(productId: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  }

  async getProducts() {
    const products = await prisma.product.findMany();

    return products;
  }

  async updateProduct({
    id,
    name,
    description,
    price,
  }: UpdateProductParamsTypes) {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
      },
    });

    return product;
  }
}
