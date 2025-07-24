FROM nginx:alpine

# Remove ALL default files
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy your custom config
COPY nginx.conf /etc/nginx/nginx.conf

# Create empty directory for default server
RUN mkdir -p /var/www/empty