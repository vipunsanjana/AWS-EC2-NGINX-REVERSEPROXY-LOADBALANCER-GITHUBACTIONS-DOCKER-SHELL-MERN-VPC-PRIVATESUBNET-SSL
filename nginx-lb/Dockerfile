# Use official NGINX base image
FROM nginx:latest

# Remove the default nginx.conf to avoid conflicts
RUN rm /etc/nginx/nginx.conf

# Copy your custom nginx.conf into the container
COPY nginx.conf /etc/nginx/nginx.conf
