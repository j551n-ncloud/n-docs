# N-Docs Makefile Guide

This project uses a comprehensive Makefile for build automation, deployment, and development workflows.

## Quick Reference

```bash
make help          # Show all available commands
make dev           # Start development server
make deploy        # Deploy to production
make status        # Check application status
```

## Available Commands

### Development
```bash
make install       # Install dependencies
make dev          # Start development server
make dev-setup    # Setup development environment
```

### Building
```bash
make clean        # Clean build artifacts
make build        # Build for production
make production   # Alias for build
make all          # Build everything
```

### Docker Operations
```bash
make docker-build    # Build Docker image
make docker-run      # Run Docker container
make docker-stop     # Stop Docker container
make docker-clean    # Clean Docker resources
make docker-logs     # Show container logs
```

### Docker Compose
```bash
make compose-up         # Start with Docker Compose
make compose-up-nginx   # Start with Nginx proxy
make compose-down       # Stop Docker Compose
make compose-logs       # Show compose logs
```

### Deployment
```bash
make deploy          # Deploy application
make quick-deploy    # Quick deployment
make prod-deploy     # Full production deployment
make fresh-start     # Complete fresh deployment
```

### Maintenance
```bash
make restart         # Restart application
make rebuild         # Rebuild and restart
make quick-restart   # Quick restart
make health         # Check application health
make status         # Show application status
```

### Quality & Security
```bash
make lint           # Run linter
make format         # Format code
make test           # Run tests
make security-scan  # Run security audit
make size-check     # Check bundle size
```

### Utilities
```bash
make backup         # Backup application data
make update         # Update dependencies
make env-check      # Check environment variables
make monitor        # Monitor application
make docs          # Show documentation links
```

## Common Workflows

### Development Workflow
```bash
# Initial setup
make dev-setup

# Start development
make dev

# Code quality checks
make lint
make format
make test
```

### Production Deployment
```bash
# Quick deployment
make deploy

# Full production deployment
make prod-deploy

# Check status
make status
make health
```

### Maintenance Workflow
```bash
# Update dependencies
make update

# Security check
make security-scan

# Backup before changes
make backup

# Fresh deployment
make fresh-start
```

### Troubleshooting
```bash
# Check logs
make docker-logs

# Monitor in real-time
make monitor

# Restart if issues
make restart

# Complete rebuild
make rebuild
```

## Environment Variables

The Makefile automatically sets these production variables:
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`
- `NEXT_PUBLIC_DEV_MODE=false`
- `NEXT_PUBLIC_DISABLE_DEVTOOLS=true`

Check current environment:
```bash
make env-check
```

## Configuration

### Default Settings
- **App Name**: n-docs
- **Container Name**: n-docs-app
- **Port**: 3000
- **Image**: n-docs:latest

### Customization
You can override defaults by setting environment variables:
```bash
export PORT=8080
export CONTAINER_NAME=my-docs-app
make deploy
```

## Advanced Features

### Monitoring Dashboard
```bash
make monitor
```
Shows real-time stats including:
- Container status
- CPU and memory usage
- Recent logs
- Timestamp

### Backup System
```bash
make backup
```
Creates timestamped backups in `backups/` directory excluding:
- node_modules
- .next build files
- .git repository
- Previous backups

### Health Checks
```bash
make health
```
Performs HTTP health check on running application.

### Bundle Analysis
```bash
make size-check
```
Shows build size and breakdown of Next.js output.

## Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Deploy Application
  run: |
    make clean
    make build
    make docker-build
    make deploy
```

### Docker Integration
The Makefile works seamlessly with Docker and Docker Compose, providing a unified interface for all deployment scenarios.

## Tips & Best Practices

1. **Always use `make help`** to see available commands
2. **Use `make status`** to check application state
3. **Run `make backup`** before major changes
4. **Use `make monitor`** for real-time debugging
5. **Combine commands**: `make clean build deploy`

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
make docker-stop
make deploy
```

**Build failures:**
```bash
make clean
make fresh-start
```

**Permission issues:**
```bash
sudo make docker-clean
make deploy
```

**Container won't start:**
```bash
make docker-logs
make health
```

## Why Makefile?

✅ **Standardized** - Industry standard build tool  
✅ **Cross-platform** - Works on macOS, Linux, Windows  
✅ **Dependency management** - Automatic prerequisite handling  
✅ **Parallel execution** - Can run tasks in parallel  
✅ **Self-documenting** - Built-in help system  
✅ **IDE integration** - Supported by most editors  
✅ **Simple syntax** - Easy to read and modify  
✅ **No additional dependencies** - Built into most systems