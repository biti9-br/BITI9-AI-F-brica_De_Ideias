# Multi-stage Dockerfile para aplicação Full-Stack Vite + Express (Porta 8080)

# Etapa 1: Build da aplicação
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar código-fonte e compilar o frontend estático
COPY . .
RUN npm run build

# Etapa 2: Imagem final para execução
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copiar dependências e arquivos compilados
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expor a porta 8080 solicitada
EXPOSE 8080

# Iniciar o servidor
CMD ["tsx", "server.ts"]
