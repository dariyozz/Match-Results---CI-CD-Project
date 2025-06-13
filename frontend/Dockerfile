# Build stage
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
