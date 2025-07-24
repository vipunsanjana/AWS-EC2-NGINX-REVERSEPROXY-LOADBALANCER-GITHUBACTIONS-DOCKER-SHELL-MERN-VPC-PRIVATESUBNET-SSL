FROM nginx:stable-alpine

# Copy your built frontend static files into Nginx's default directory
COPY ../frontend/build/ /usr/share/nginx/html/

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf
