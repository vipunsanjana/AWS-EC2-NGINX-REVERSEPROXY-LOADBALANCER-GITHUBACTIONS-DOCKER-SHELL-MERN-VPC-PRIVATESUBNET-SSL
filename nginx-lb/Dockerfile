FROM nginx:alpine

# Remove ALL default configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy your custom config
COPY nginx.conf /etc/nginx/nginx.conf

# Verify config during build
RUN nginx -t