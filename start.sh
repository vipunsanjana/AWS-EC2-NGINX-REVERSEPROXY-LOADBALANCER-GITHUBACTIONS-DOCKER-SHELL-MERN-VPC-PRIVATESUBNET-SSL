#!/bin/bash

cd /home/ubuntu/app

# Stop old containers
docker rm -f mern-client || true
docker rm -f mern-server || true

# Build Docker images
docker build -t mern-client ./client
docker build -t mern-server ./server

# Run containers
docker run -d --name mern-client -p 3000:3000 mern-client
docker run -d --name mern-server -p 5000:5000 mern-server
