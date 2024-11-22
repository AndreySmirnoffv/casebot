FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run prepare 

CMD ["node", "build/server.js"]  # Замените на путь к вашему скомпилированному файлу
