#!/bin/bash

for PORT in 5001 5002; do
  NAME="backend_$PORT"
  docker stop $NAME 2>/dev/null
  docker rm $NAME 2>/dev/null
  docker run -d --name $NAME -p $PORT:5000 mern-backend
done
