# Multi-stage Dockerfile para aplicação Full-Stack Vite + Express
# Porta configurada: 8080

# ==========================================
# Estágio 1: Build do Frontend e Dependências
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copia arquivos de definição de pacotes e instala todas as dependências
COPY package*.json ./
RUN npm ci

# Copia todo o código-fonte da aplicação
COPY . .

# Compila o frontend React com Vite para a pasta dist/
RUN npm run build

# ==========================================
# Estágio 2: Imagem Final de Produção (Leve e Segura)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Variáveis de ambiente padrão de produção
ENV NODE_ENV=production
ENV PORT=8080

# Instala apenas dependências de produção e o tsx para rodar o backend TypeScript
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

# Copia o build estático e os arquivos do servidor a partir do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Exposição da porta 8080 para o container
EXPOSE 8080

# Comando para iniciar o servidor Full-Stack
CMD ["tsx", "server.ts"]
