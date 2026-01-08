import { prisma } from "prisma.js";
import { createApp } from "./app.js";
import { config } from "./config/app.config.js";
import { logger } from "./shared/utils/logger.js";

async function bootstrap() {
  try {
    // Проверка подключения к БД
    await prisma.$connect();
    logger.info("✅ Database connected");

    // Создание Express приложения
    const app = createApp();

    // Запуск сервера
    const server = app.listen(config.port, () => {
      logger.info(`🚀 Server running on http://localhost:${config.port}`);
      logger.info(`📝 Environment: ${config.env}`);
      logger.info(`🏥 Health check: http://localhost:${config.port}/health`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info("HTTP server closed");

        // Закрываем соединение с БД
        // await prisma.$disconnect();
        logger.info("Database disconnected");

        process.exit(0);
      });

      // Если за 10 секунд не успели закрыться — форсируем
      setTimeout(() => {
        logger.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Обработка сигналов завершения
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Обработка необработанных ошибок
    process.on("unhandledRejection", (reason: any) => {
      logger.error("Unhandled Rejection:", reason);
      gracefulShutdown("unhandledRejection");
    });

    process.on("uncaughtException", (error: Error) => {
      logger.error("Uncaught Exception:", error);
      gracefulShutdown("uncaughtException");
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Запуск приложения
bootstrap();
