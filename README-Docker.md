# N-Docs Docker Deployment

This guide explains how to deploy N-Docs using Docker.

## Quick Start

### Option 1: Using Makefile (Recommended)
```bash
make deploy
```

### Option 2: Manual Docker commands
```bash
# Build the image
docker build -t n-docs:latest .

# Run the container
docker run -d \
  --name n-docs-app \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  n-docs:latest
```

### Option 3: Using Docker Compose
```bash
# Basic deployment
make compose-up

# With nginx reverse proxy  
make compose-up-nginx
```

## Access Your Documentation

After deployment, your N-Docs will be available at:
- **Direct access**: http://localhost:3000
- **With nginx**: http://localhost (port 80)

## Docker Commands

### Container Management
```bash
# View running containers
docker ps

# View logs
docker logs n-docs-app

# Stop container
docker stop n-docs-app

# Start container
docker start n-docs-app

# Remove container
docker rm n-docs-app

# Restart container
docker restart n-docs-app
```

### Image Management
```bash
# List images
docker images

# Remove image
docker rmi n-docs:latest

# Rebuild image
docker build --no-cache -t n-docs:latest .
```

## Production Deployment

### Environment Variables
```bash
docker run -d \
  --name n-docs-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  n-docs:latest
```

### With Custom Port
```bash
docker run -d \
  --name n-docs-app \
  -p 8080:3000 \
  n-docs:latest
```

### With Volume Mounting (for content updates)
```bash
docker run -d \
  --name n-docs-app \
  -p 3000:3000 \
  -v $(pwd)/content:/app/content:ro \
  n-docs:latest
```

## Nginx Reverse Proxy

The included nginx configuration provides:
- **Gzip compression**
- **Static file caching**
- **Security headers**
- **Rate limiting**
- **SSL/HTTPS support** (commented out)

To use nginx:
```bash
docker-compose --profile with-nginx up -d
```

## SSL/HTTPS Setup

1. Uncomment SSL configuration in `nginx.conf`
2. Add your SSL certificates to `./ssl/` directory
3. Update server name in nginx config
4. Restart nginx container

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs n-docs-app

# Check if port is in use
lsof -i :3000
```

### Build fails
```bash
# Clean build
docker build --no-cache -t n-docs:latest .

# Check Docker daemon
docker info
```

### Permission issues
```bash
# Fix file permissions
chmod +x deploy.sh
```

## Health Checks

The Docker Compose configuration includes health checks:
```bash
# Check container health
docker-compose ps
```

## Updates

To update your deployment:
```bash
# Pull latest changes
git pull

# Rebuild and redeploy
./deploy.sh
```

## Resource Usage

- **Memory**: ~100-200MB
- **CPU**: Minimal (Node.js app)
- **Disk**: ~50-100MB (depending on content)

## Security Considerations

- Container runs as non-root user
- Minimal attack surface with Alpine Linux
- Security headers via nginx
- Rate limiting enabled
- No sensitive data in image layers