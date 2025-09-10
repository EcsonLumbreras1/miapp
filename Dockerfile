FROM node:18-alpine
WORKDIR /app

# Copiamos solo package.json e instalamos deps
COPY package.json ./
RUN npm install --production --no-fund --no-audit

# Copiamos el código
COPY server.js ./
COPY public ./public

EXPOSE 3000
CMD ["npm","start"]
