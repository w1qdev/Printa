import compression from "compression";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import apiRouter from "./api/routes/index";
import { config } from "./config/app.config";

// Routes (создадим позже)
// import routes from './api/routes/index.js';

// Middleware (создадим позже)
// import { errorMiddleware } from './api/middleware/error.middleware.js';

export const app = express();

export function createApp(): Express {
  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      hsts: {
        maxAge: 31536000, // 1 год
        includeSubDomains: true,
        preload: true,
      },
    }),
  );

  // CORS
  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  // Body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // 100 запросов с одного IP
    message: "Слишком много запросов с вашего IP, попробуйте позже",
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use("/api", limiter);
  app.use("/api", apiRouter);

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Только 5 попыток входа за 15 минут
    skipSuccessfulRequests: true,
  });

  // app.use("/api/auth/login", authLimiter);
  // app.use("/api/auth/register", authLimiter);

  // Compression
  app.use(compression());

  // Health check
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API Routes (подключим позже)
  // app.use('/api', routes);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "Not Found",
      message: `Route ${req.method} ${req.path} not found`,
    });
  });

  // Error handling middleware (подключим позже)
  // app.use(errorMiddleware);

  return app;
}
