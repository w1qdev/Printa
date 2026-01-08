# 3D Print Marketplace - Backend

## Установка

```bash
npm install
```

## Настройка

1. Скопируйте `.env.example` в `.env`
2. Настройте переменные окружения
3. Запустите PostgreSQL (через docker-compose или локально)

## Разработка

```bash
# Запуск БД
docker-compose up -d

# Применение миграций
npm run prisma:migrate

# Генерация Prisma Client
npm run prisma:generate

# Запуск dev сервера
npm run dev
```

## Сборка

```bash
npm run build
npm start
```
