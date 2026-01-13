import request from "supertest";
import { app } from "../app";
import { describe, it, expect, beforeAll } from "@jest/globals";

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("должен зарегистрировать нового пользователя", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body.user).toHaveProperty("email", "test@example.com");
    });

    it("должен вернуть ошибку при дублировании email", async () => {
      await request(app).post("/api/auth/register").send({
        email: "duplicate@example.com",
        password: "password123",
      });

      const response = await request(app).post("/api/auth/register").send({
        email: "duplicate@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /api/auth/login", () => {
    it("должен авторизовать пользователя", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
    });

    it("должен установить cookie с refreshToken", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toMatch(/refreshToken/);
    });
  });
});
