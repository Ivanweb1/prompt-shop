# Сборка из корня репо: docker build -f server/Dockerfile .
FROM node:24-alpine
WORKDIR /app
RUN echo "{\"type\":\"module\"}" > package.json
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev
COPY data ./data
COPY server/index.mjs ./server/
ENV NODE_ENV=production PORT=8787 FILES_DIR=/files STATE_DIR=/state
EXPOSE 8787
CMD ["node", "server/index.mjs"]
