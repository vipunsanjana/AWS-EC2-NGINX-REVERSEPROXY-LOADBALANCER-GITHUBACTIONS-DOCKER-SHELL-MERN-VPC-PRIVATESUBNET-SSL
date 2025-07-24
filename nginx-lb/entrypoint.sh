#!/bin/sh

# Test configuration
nginx -t

# Start Nginx
exec nginx -g 'daemon off;'