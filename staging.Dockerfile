FROM node:14.16.0-alpine3.10

RUN mkdir /app
RUN mkdir /app/backend
RUN mkdir /app/frontend
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock /app/
RUN yarn
COPY backend/package.json backend/yarn.lock /app/backend/
RUN yarn --cwd backend
COPY frontend/package.json frontend/yarn.lock /app/frontend/
RUN yarn --cwd frontend

COPY . /app/
RUN yarn --cwd backend build
RUN VUE_APP_API_BASE_URL=https://simple-twitter-clone.jacobgoh.dev/api-v1 VUE_APP_SOCKET_IO_BASE_URL=https://simple-twitter-clone.jacobgoh.dev yarn --cwd frontend build

CMD ["npx","pm2-runtime", "backend/dist/apps/web/main.js"]
