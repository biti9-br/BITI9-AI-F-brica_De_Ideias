# Multi-stage Dockerfile para aplicação Full-Stack Vite + Express
# Porta configurada: 8080

# ==========================================
# Estágio 1: Build do Frontend e Dependências
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copia arquivos de pacotes
COPY package*.json ./

# Instala todas as dependências com tolerância para lockfiles
RUN npm ci || npm install

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

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala apenas dependências de produção necessárias
RUN npm ci --omit=dev || npm install --omit=dev

# Copia o build estático e os arquivos do servidor a partir do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Exposição da porta 8080 para o container
EXPOSE 8080

# Comando para iniciar o servidor Full-Stack
CMD ["npx", "tsx", "server.ts"]
