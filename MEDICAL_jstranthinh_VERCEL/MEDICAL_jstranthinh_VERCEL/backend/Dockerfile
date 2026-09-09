FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prisma config validates DATABASE_URL even though generate does not connect to DB.
ARG DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medical_booking
ENV DATABASE_URL=$DATABASE_URL

RUN npm run prisma:generate
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
# Keep Prisma CLI available because deployment may run `prisma migrate deploy`.
RUN npm ci

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/src/generated ./src/generated

CMD ["node", "dist/server.js"]
