FROM node:16

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV MONGO_HOST=localhost
ENV MONGO_PORT=27017
ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "run", "start"]
