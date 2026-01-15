FROM node:23

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Install ping ONLY in development
RUN if [ "$NODE_ENV" = "development" ]; then \
      apt-get update && apt-get install -y iputils-ping; \
    fi

COPY package.json package-lock.json ./

RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm install --omit=dev; \
    fi

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
