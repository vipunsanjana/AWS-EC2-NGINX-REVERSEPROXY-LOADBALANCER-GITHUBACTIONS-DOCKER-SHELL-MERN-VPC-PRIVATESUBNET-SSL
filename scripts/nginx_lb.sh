#!/bin/bash

docker stop nginx_lb 2>/dev/null
docker rm nginx_lb 2>/dev/null
docker run -d \
  --name nginx_lb \
  -p 80:80 \
  -v $(pwd)/nginx_lb.conf:/etc/nginx/conf.d/default.conf \
  nginx:alpine
echo "Nginx load balancer started on port 80"