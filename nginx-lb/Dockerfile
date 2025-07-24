FROM nginx:alpine

# Remove ALL default configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy your custom config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make script executable
RUN chmod +x /entrypoint.sh

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]