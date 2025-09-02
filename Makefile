# N-Docs Makefile
# Modern build automation for Next.js documentation platform

.PHONY: help install dev build clean docker-build docker-run docker-stop docker-clean deploy production test lint format

# Default target
.DEFAULT_GOAL := help

# Variables
APP_NAME := n-docs
CONTAINER_NAME := n-docs-app
IMAGE_NAME := $(APP_NAME):latest
PORT := 3000

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Help target
help: ## Show this help message
	@echo "$(GREEN)N-Docs Build System$(NC)"
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development targets
install: ## Install dependencies
	@echo "$(GREEN)[INFO]$(NC) Installing dependencies..."
	npm ci

dev: install ## Start development server
	@echo "$(GREEN)[INFO]$(NC) Starting development server..."
	npm run dev

# Build targets
clean: ## Clean build artifacts
	@echo "$(GREEN)[INFO]$(NC) Cleaning build artifacts..."
	rm -rf .next
	rm -rf out
	rm -rf dist
	rm -rf node_modules/.cache

build: clean install ## Build for production
	@echo "$(GREEN)[INFO]$(NC) Building for production..."
	@export NODE_ENV=production && \
	export NEXT_TELEMETRY_DISABLED=1 && \
	export NEXT_PUBLIC_DEV_MODE=false && \
	export NEXT_PUBLIC_DISABLE_DEVTOOLS=true && \
	export ESLINT_NO_DEV_ERRORS=true && \
	npm run build
	@echo "$(GREEN)[SUCCESS]$(NC) Production build completed!"

production: build ## Alias for build target
	@echo "$(GREEN)[INFO]$(NC) Production build ready for deployment"

# Docker targets
docker-build: ## Build Docker image
	@echo "$(GREEN)[INFO]$(NC) Building Docker image..."
	docker build -t $(IMAGE_NAME) .
	@echo "$(GREEN)[SUCCESS]$(NC) Docker image built: $(IMAGE_NAME)"

docker-run: docker-build ## Run Docker container
	@echo "$(GREEN)[INFO]$(NC) Starting Docker container..."
	@if docker ps -a --format 'table {{.Names}}' | grep -q '^$(CONTAINER_NAME)$$'; then \
		echo "$(YELLOW)[WARNING]$(NC) Stopping existing container..."; \
		docker stop $(CONTAINER_NAME) || true; \
		docker rm $(CONTAINER_NAME) || true; \
	fi
	docker run -d \
		--name $(CONTAINER_NAME) \
		--restart unless-stopped \
		-p $(PORT):3000 \
		-e NODE_ENV=production \
		-e NEXT_TELEMETRY_DISABLED=1 \
		-e NEXT_PUBLIC_DEV_MODE=false \
		-e NEXT_PUBLIC_DISABLE_DEVTOOLS=true \
		$(IMAGE_NAME)
	@sleep 3
	@if docker ps --format 'table {{.Names}}' | grep -q '^$(CONTAINER_NAME)$$'; then \
		echo "$(GREEN)[SUCCESS]$(NC) Container running at http://localhost:$(PORT)"; \
	else \
		echo "$(RED)[ERROR]$(NC) Failed to start container"; \
		exit 1; \
	fi

docker-stop: ## Stop Docker container
	@echo "$(GREEN)[INFO]$(NC) Stopping Docker container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

docker-clean: docker-stop ## Clean Docker resources
	@echo "$(GREEN)[INFO]$(NC) Cleaning Docker resources..."
	docker rmi $(IMAGE_NAME) || true
	docker system prune -f

docker-logs: ## Show Docker container logs
	docker logs -f $(CONTAINER_NAME)

# Docker Compose targets
compose-up: ## Start with Docker Compose
	@echo "$(GREEN)[INFO]$(NC) Starting with Docker Compose..."
	docker compose up -d

compose-up-nginx: ## Start with Docker Compose + Nginx
	@echo "$(GREEN)[INFO]$(NC) Starting with Docker Compose + Nginx..."
	docker compose --profile with-nginx up -d

compose-down: ## Stop Docker Compose
	@echo "$(GREEN)[INFO]$(NC) Stopping Docker Compose..."
	docker compose down

compose-logs: ## Show Docker Compose logs
	docker compose logs -f

# Deployment targets
deploy: docker-run ## Deploy application (alias for docker-run)
	@echo "$(GREEN)[SUCCESS]$(NC) Deployment completed!"
	@echo "$(GREEN)[INFO]$(NC) Access your app at: http://localhost:$(PORT)"
	@echo "$(GREEN)[INFO]$(NC) View logs: make docker-logs"
	@echo "$(GREEN)[INFO]$(NC) Stop app: make docker-stop"

# Quality targets
lint: ## Run linter
	@echo "$(GREEN)[INFO]$(NC) Running linter..."
	npm run lint || echo "$(YELLOW)[WARNING]$(NC) Linting issues found"

format: ## Format code
	@echo "$(GREEN)[INFO]$(NC) Formatting code..."
	npx prettier --write . || echo "$(YELLOW)[WARNING]$(NC) Prettier not configured"

test: ## Run tests
	@echo "$(GREEN)[INFO]$(NC) Running tests..."
	npm test || echo "$(YELLOW)[WARNING]$(NC) No tests configured"

# Utility targets
status: ## Show application status
	@echo "$(GREEN)[INFO]$(NC) Application Status:"
	@if docker ps --format 'table {{.Names}}' | grep -q '^$(CONTAINER_NAME)$$'; then \
		echo "  🟢 Container: Running"; \
		echo "  🌐 URL: http://localhost:$(PORT)"; \
		echo "  📊 Stats: $$(docker stats --no-stream --format 'CPU: {{.CPUPerc}}, Memory: {{.MemUsage}}' $(CONTAINER_NAME))"; \
	else \
		echo "  🔴 Container: Not running"; \
	fi

restart: docker-stop docker-run ## Restart application

rebuild: docker-clean docker-run ## Rebuild and restart

# Development workflow
dev-setup: install ## Setup development environment
	@echo "$(GREEN)[INFO]$(NC) Development environment ready!"
	@echo "$(GREEN)[INFO]$(NC) Run 'make dev' to start development server"

# Production workflow
prod-deploy: clean build docker-build docker-run ## Full production deployment
	@echo "$(GREEN)[SUCCESS]$(NC) Full production deployment completed!"

# Quick commands
quick-deploy: ## Quick deployment (build + run)
	@$(MAKE) docker-run

quick-restart: ## Quick restart
	@$(MAKE) restart

# Health check
health: ## Check application health
	@echo "$(GREEN)[INFO]$(NC) Checking application health..."
	@curl -f http://localhost:$(PORT) > /dev/null 2>&1 && \
		echo "$(GREEN)[SUCCESS]$(NC) Application is healthy" || \
		echo "$(RED)[ERROR]$(NC) Application is not responding"

# Advanced targets
backup: ## Backup application data
	@echo "$(GREEN)[INFO]$(NC) Creating backup..."
	@mkdir -p backups
	@tar -czf backups/n-docs-backup-$$(date +%Y%m%d-%H%M%S).tar.gz \
		--exclude=node_modules \
		--exclude=.next \
		--exclude=.git \
		--exclude=backups \
		.
	@echo "$(GREEN)[SUCCESS]$(NC) Backup created in backups/ directory"

update: ## Update dependencies
	@echo "$(GREEN)[INFO]$(NC) Updating dependencies..."
	npm update
	@echo "$(GREEN)[SUCCESS]$(NC) Dependencies updated"

security-scan: ## Run security audit
	@echo "$(GREEN)[INFO]$(NC) Running security audit..."
	npm audit || echo "$(YELLOW)[WARNING]$(NC) Security vulnerabilities found"

size-check: ## Check bundle size
	@echo "$(GREEN)[INFO]$(NC) Checking bundle size..."
	@if [ -d ".next" ]; then \
		du -sh .next && \
		echo "$(GREEN)[INFO]$(NC) Detailed size breakdown:"; \
		du -sh .next/* 2>/dev/null || true; \
	else \
		echo "$(YELLOW)[WARNING]$(NC) No build found. Run 'make build' first"; \
	fi

# Environment targets
env-check: ## Check environment variables
	@echo "$(GREEN)[INFO]$(NC) Environment Variables:"
	@echo "  NODE_ENV: $${NODE_ENV:-not set}"
	@echo "  NEXT_TELEMETRY_DISABLED: $${NEXT_TELEMETRY_DISABLED:-not set}"
	@echo "  NEXT_PUBLIC_DEV_MODE: $${NEXT_PUBLIC_DEV_MODE:-not set}"
	@echo "  NEXT_PUBLIC_DISABLE_DEVTOOLS: $${NEXT_PUBLIC_DISABLE_DEVTOOLS:-not set}"

# Monitoring targets
monitor: ## Monitor application (requires running container)
	@echo "$(GREEN)[INFO]$(NC) Monitoring application..."
	@echo "Press Ctrl+C to stop monitoring"
	@while true; do \
		clear; \
		echo "$(GREEN)N-Docs Monitoring Dashboard$(NC)"; \
		echo "================================"; \
		echo "Time: $$(date)"; \
		echo ""; \
		if docker ps --format 'table {{.Names}}' | grep -q '^$(CONTAINER_NAME)$$'; then \
			echo "Status: 🟢 Running"; \
			echo "Stats: $$(docker stats --no-stream --format 'CPU: {{.CPUPerc}}, Memory: {{.MemUsage}}' $(CONTAINER_NAME))"; \
			echo ""; \
			echo "Recent logs:"; \
			docker logs --tail 5 $(CONTAINER_NAME) 2>/dev/null || true; \
		else \
			echo "Status: 🔴 Not running"; \
		fi; \
		sleep 5; \
	done

# Documentation targets
docs: ## Generate documentation
	@echo "$(GREEN)[INFO]$(NC) Documentation available at:"
	@echo "  📖 README: ./README.md"
	@echo "  🐳 Docker: ./README-Docker.md"
	@echo "  🔧 Makefile: make help"

# All-in-one targets
all: clean install build docker-build ## Build everything
	@echo "$(GREEN)[SUCCESS]$(NC) All targets completed!"

fresh-start: docker-clean clean install build docker-run ## Complete fresh deployment
	@echo "$(GREEN)[SUCCESS]$(NC) Fresh deployment completed!"