# Multi-stage Dockerfile para aplicação Full-Stack Vite + Express
# Porta padrão configurada: 8080

# ==========================================
# Etapa 1: Build do Frontend e Dependências
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Instalação das dependências
COPY package*.json ./
RUN npm ci

# Cópia do código e geração da build estática (dist/)
COPY . .
RUN npm run build

# ==========================================
# Etapa 2: Ambiente de Execução (Produção)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Configurações de ambiente para produção na porta 8080
ENV NODE_ENV=production
ENV PORT=8080

# Instalação apenas das dependências de produção e tsx para execução do server.ts
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

# Cópia dos artefatos construídos e arquivos do servidor
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Exposição da porta 8080
EXPOSE 8080

# Inicialização do servidor em produção
CMD ["tsx", "server.ts"]
