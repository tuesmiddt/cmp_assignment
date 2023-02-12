FROM node:18-alpine
WORKDIR /app
COPY . .

# Build frontend assets
WORKDIR /app/frontend
RUN npm install
RUN npm run build && npm run export

# Copy frontend assets to backend public
WORKDIR /app
RUN cp -r frontend/out/* api/src/public

# Build bundle with both frontend and backend
WORKDIR /app/api
RUN cp env/.env.production env/.env.production.local
RUN npm install && npm run build

EXPOSE 8081
cmd ["npm", "start"]
