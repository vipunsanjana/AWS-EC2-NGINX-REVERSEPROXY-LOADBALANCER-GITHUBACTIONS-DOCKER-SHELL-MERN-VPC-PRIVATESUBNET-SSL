#!/bin/bash

CONFIG_DIR="/home/ubuntu/my-mern-app/scripts"

docker stop nginx_lb 2>/dev/null || true
docker rm nginx_lb 2>/dev/null || true

docker run -d \
  --name nginx_lb \
  -p 80:80 \
  -v "$CONFIG_DIR":/etc/nginx/conf.d \
  nginx:alpine

echo "✅ Nginx load balancer started with config from $CONFIG_DIR"
