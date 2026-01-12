FROM node:23

WORKDIR /app

# Build-time env
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY package.json package-lock.json ./

RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm install --omit=dev; \
    fi

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]
