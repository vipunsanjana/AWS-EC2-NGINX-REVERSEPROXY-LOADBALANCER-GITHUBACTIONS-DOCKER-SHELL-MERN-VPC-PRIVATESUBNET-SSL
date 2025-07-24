#!/bin/bash

# Get absolute path to this script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Full path to the Nginx config file
NGINX_CONF_PATH="$SCRIPT_DIR/nginx_lb.conf"

# Stop and remove existing nginx_lb container if any
docker stop nginx_lb 2>/dev/null
docker rm nginx_lb 2>/dev/null

# Start new nginx_lb container using the config file
docker run -d \
  --name nginx_lb \
  -p 80:80 \
  -v "$NGINX_CONF_PATH":/etc/nginx/conf.d/default.conf \
  nginx:alpine

echo "✅ Nginx load balancer started on port 80 using config: $NGINX_CONF_PATH"
