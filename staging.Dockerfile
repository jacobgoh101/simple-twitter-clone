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
RUN yarn --cwd backend build
COPY frontend/package.json frontend/yarn.lock /app/frontend/
RUN yarn --cwd frontend
RUN yarn --cwd frontend build

# Or if you're using Yarn
# ADD package.json yarn.lock /app/
# RUN yarn install

COPY . /app/

CMD ["npx","pm2-runtime", "backend/dist/main.js"]
