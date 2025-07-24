FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

# Remove ALL default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy your React/Vue build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Create a new minimal Nginx config
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf