# Use official Node 20 slim image
FROM node:20-slim

WORKDIR /app

# Copy package files and install prod deps only
COPY package.json ./
RUN npm install --omit=dev

# Copy compiled output
COPY dist ./dist

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "dist/index.js"]
