import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresAccessIn: process.env.JWT_ACCESS_EXPIRES_IN || "10m",
    expiresRefreshIn: process.env.JWT_REFRESH_EXPIRES_IN || "2m",
  },

  bcrypt: {
    secret: process.env.BCRYPT_SECRET,
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  yukassa: {
    shopId: process.env.YUKASSA_SHOP_ID,
    secretKey: process.env.YUKASSA_SECRET_KEY,
    webhookUrl: process.env.YUKASSA_WEBHOOK_URL,
  },

  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    adminChatId: process.env.TELEGRAM_ADMIN_CHAT_ID,
  },
} as const;
