# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Gera a build de produção
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS runner

WORKDIR /app

# Copia apenas os arquivos necessários do estágio de build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expõe a porta 3000
EXPOSE 3000

# Define a variável de ambiente para o host
ENV HOSTNAME "0.0.0.0"

# Inicia o servidor
CMD ["node", "server.js"] 