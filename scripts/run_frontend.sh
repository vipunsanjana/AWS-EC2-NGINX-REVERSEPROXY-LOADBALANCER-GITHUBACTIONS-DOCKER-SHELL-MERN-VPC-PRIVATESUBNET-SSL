#!/bin/bash

docker stop frontend 2>/dev/null
docker rm frontend 2>/dev/null
docker run -d --name frontend -p 8080:80 mern-frontend
