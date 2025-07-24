# MERN App Deployment on AWS EC2 with Docker, NGINX Load Balancer, and GitHub Actions

## Overview

This project demonstrates how to:

* Build and deploy a MERN (MongoDB, Express, React, Node.js) application.
* Use Docker to containerize backend and frontend.
* Use NGINX as a reverse proxy and load balancer (2 backend replicas).
* Secure the app with SSL via Let's Encrypt.
* Automate deployment with GitHub Actions.
* Store secrets securely in GitHub Secrets and AWS Secrets Manager.

---

## Project Structure

```
mern-app/
├── backend/               # Express backend
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── frontend/              # React frontend
│   ├── Dockerfile
│   ├── nginx.conf        # NGINX config for serving React app
│   └── package.json
├── scripts/
│   ├── run_backend.sh     # Start 2 backend containers
│   ├── run_frontend.sh    # Start frontend container
│   ├── nginx_lb.sh        # Run NGINX load balancer container
│   └── nginx_lb.conf      # NGINX load balancer config
├── .gitignore
├── .dockerignore
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions workflow
```

---

## Prerequisites

* AWS EC2 instance (Ubuntu recommended)
* Docker installed on EC2
* Domain name pointing to EC2 public IP
* Docker Hub account (for image registry)
* GitHub repository configured with Secrets:

  * `DOCKERHUB_USERNAME`
  * `DOCKERHUB_ACCESS_TOKEN`
  * `EC2_HOST`
  * `EC2_USER`
  * `EC2_SSH_KEY` (your private SSH key content)

---

## Setup on EC2

Run these commands on EC2 to prepare environment:

```bash
sudo apt update
sudo apt install docker.io nginx certbot python3-certbot-nginx -y
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
newgrp docker
```

---

## SSL Setup

Run once on EC2 after DNS is pointed to your EC2 IP:

```bash
sudo certbot --nginx -d yourdomain.com --non-interactive --agree-tos -m your-email@example.com
sudo systemctl reload nginx
```

---

## Docker Images

* Backend listens on port `5000`.
* Frontend served by NGINX listens on port `80` inside container, mapped to `8080` on host.
* Two backend replicas run on ports `5001` and `5002`.
* NGINX load balancer listens on port `80`, proxies `/api` to backend replicas, serves frontend from port `8080`.

---

## NGINX Load Balancer Config (`scripts/nginx_lb.conf`)

```nginx
upstream backend {
  server 127.0.0.1:5001;
  server 127.0.0.1:5002;
}

server {
  listen 80;
  server_name yourdomain.com;

  location /api/ {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location / {
    proxy_pass http://localhost:8080;
  }
}
```

---

## Deployment Automation

### GitHub Actions Workflow

On each push to `main`, workflow will:

1. Build backend and frontend Docker images.
2. Push images to Docker Hub.
3. SSH into EC2, pull updated images.
4. Restart backend (2 replicas), frontend, and NGINX load balancer containers.

The workflow file is `.github/workflows/deploy.yml`.

---

## How to Run Locally

1. Clone repo.
2. Build images locally:

```bash
docker build -t yourusername/mern-backend:latest ./backend
docker build -t yourusername/mern-frontend:latest ./frontend
```

3. Run backend replicas:

```bash
./scripts/run_backend.sh
```

4. Run frontend:

```bash
./scripts/run_frontend.sh
```

5. Run NGINX load balancer:

```bash
./scripts/nginx_lb.sh
```

---

## Viewing Logs

* GitHub Actions logs: Go to GitHub repo → Actions tab → click latest run → expand steps.
* EC2 Docker container logs:

```bash
docker logs -f backend_5001
docker logs -f backend_5002
docker logs -f frontend
docker logs -f nginx_lb
```

* NGINX logs on EC2 (if native NGINX used):

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

* Make sure ports 80, 8080, 5001, 5002 are open in your EC2 security group.
* Confirm domain DNS is properly pointed.
* Check Docker container logs for errors.
* Check GitHub Actions logs for build or deployment errors.

---

## Need More Help?

Feel free to ask for:

* Backend sample Express `server.js`
* Frontend React starter template
* MongoDB integration help
* SSL auto-renew scripts
* Anything else!

---

# Thank you! 🚀

---

