FROM nginx:stable-alpine

# Since build context is project root, path to frontend build is:
COPY frontend/build/ /usr/share/nginx/html/

# Copy nginx config inside nginx-lb folder
COPY nginx.conf /etc/nginx/nginx.conf
