FROM node:23

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json package-lock.json ./

RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm install --only=production; \
    fi

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]
