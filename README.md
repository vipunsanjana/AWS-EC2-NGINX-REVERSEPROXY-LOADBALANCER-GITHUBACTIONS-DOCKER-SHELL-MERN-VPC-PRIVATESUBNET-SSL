# MERN App Deployment on AWS EC2 with Docker, NGINX Load Balancer, Reverse Proxy and GitHub Actions

## 🚀 Overview

This project demonstrates how to:

- Build and deploy a **MERN** (MongoDB, Express, React, Node.js) application.
- Use **Docker** to containerize both backend and frontend apps.
- Use **NGINX** as a reverse proxy and load balancer for backend replicas.
- Secure the application using **SSL via Let's Encrypt**.
- Automate deployment using **GitHub Actions**.
- Store secrets securely using **GitHub Secrets** and **AWS Secrets Manager**.

---

## 📁 Project Structure

```

MY-MERN-APP/
├── backend/               # Express backend service
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/              # React frontend
│   ├── Dockerfile
│   ├── nginx.conf         # NGINX config to serve React
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── nginx-lb/              # NGINX Load Balancer config
│   ├── Dockerfile
│   ├── nginx.conf
│   └── entrypoint.sh
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions CI/CD workflow
├── docker-compose.yml     # Optional: for local orchestration
├── .dockerignore
├── .gitignore
└── README.md

````

---

## ✅ Prerequisites

- AWS EC2 instance (Ubuntu preferred)
- Docker installed on EC2
- A domain name pointing to your EC2 public IP
- Docker Hub account
- GitHub repository with the following secrets:

  - `DOCKERHUB_USERNAME`
  - `DOCKERHUB_ACCESS_TOKEN`
---

## ⚙️ EC2 Setup

SSH into your EC2 instance and run:

```bash
sudo apt update
sudo apt install docker.io nginx certbot python3-certbot-nginx -y
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
newgrp docker
````

---

## 🔐 SSL Configuration

After pointing your domain to EC2, run:

```bash
sudo certbot --nginx -d yourdomain.com --non-interactive --agree-tos -m your-email@example.com
sudo systemctl reload nginx
```

---

## 🐳 Docker Setup

### Ports

* Backend: `5000` (inside container), mapped to `5001`, `5002`
* Frontend: `80` inside container, mapped to `8080`
* NGINX Load Balancer: listens on `80`

---

## 🔁 NGINX Load Balancer (`nginx-lb/nginx.conf`)

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

## ⚡ GitHub Actions (CI/CD)

The workflow in `.github/workflows/deploy.yml` does the following:

1. Builds Docker images for backend & frontend.
2. Pushes images to Docker Hub.
3. SSH into EC2 → Pull images → Restart containers.

Trigger: Push to `main` branch.

---

## 🧪 Run Locally

### 1. Clone Repo

```bash
git clone https://github.com/yourusername/mern-app.git
cd mern-app
```

### 2. Build Images

```bash
docker build -t yourusername/mern-backend:latest ./backend
docker build -t yourusername/mern-frontend:latest ./frontend
```

### 3. Run Containers

```bash
docker run -d --name backend_5001 -p 5001:5000 yourusername/mern-backend
docker run -d --name backend_5002 -p 5002:5000 yourusername/mern-backend
docker run -d --name frontend -p 8080:80 yourusername/mern-frontend
docker run -d --name nginx_lb -p 80:80 -v ./nginx-lb/nginx.conf:/etc/nginx/nginx.conf nginx
```

---

## 📋 Logs

### Docker container logs:

```bash
docker logs -f backend_5001
docker logs -f backend_5002
docker logs -f frontend
docker logs -f nginx_lb
```

### NGINX logs (native):

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🧩 Troubleshooting

* Check that ports 80, 8080, 5001, 5002 are open in EC2 Security Group.
* Validate domain → EC2 public IP mapping.
* Check logs of Docker containers or GitHub Actions run.

---

## 🧠 Need Help?

Feel free to ask for:

* Sample `server.js` for Express backend
* Sample React frontend setup
* MongoDB connection guidance
* Auto-renewing SSL setup

---

## 👤 Maintainer

**Vipun Sanjana**
Former Intern - Software Engineer
[WSO2 Cloud Security Operations Center]

---

