DOCKER = docker
COMPOSE = docker-compose
COMPOSE_FILE = $(CURDIR)/infra/deploy/local/docker-compose.yml
DOCKER_PROD_FILE = $(CURDIR)/infra/deploy/local/Dockerfile
DOCKER_PROD_TAG = cx-invoicing-portal:prod
ENV = $(CURDIR)/local.env

-include $(ENV)
export

.PHONY: help
help: ## Displays help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: run-install
run-install: ## Install dependencies
	$(COMPOSE) -f $(COMPOSE_FILE) build app
	$(COMPOSE) -f $(COMPOSE_FILE) run --rm app yarn install

.PHONY: run-tests
run-tests: ## Run tests
	$(COMPOSE) -f $(COMPOSE_FILE) build app
	$(COMPOSE) -f $(COMPOSE_FILE) run --rm app yarn test

.PHONY: lint
lint: ## Lint files
	yarn lint

.PHONY: run-dockerized-app
run-dockerized-app: ## Run dockerize app
	$(COMPOSE) -f $(COMPOSE_FILE) build app
	$(COMPOSE) -f $(COMPOSE_FILE) up -d app

.PHONY: run-install
cleanup: ## Clean
	$(COMPOSE) -f $(COMPOSE_FILE) down --remove-orphans

.PHONY: open-browser
open-browser: ## Open browser
	open http://localhost:3000

run-docker: run-dockerized-app open-browser ## Run with docker

.PHONY: run-without-docker
run-without-docker: ## Run without docker
	yarn start

.PHONY: run-with-docker
run-docker: lint run-dockerized-app open-browser ## Run with docker

.PHONY: ci-build
ci-build:
	$(COMPOSE) -f $(COMPOSE_FILE) build app

.PHONY: ci-lint
ci-lint:
	$(COMPOSE) -f $(COMPOSE_FILE) run app yarn lint

.PHONY: ci-tests
ci-tests:
	$(COMPOSE) -f $(COMPOSE_FILE) run app yarn test --watchAll=false

.PHONY: ci
ci: cleanup ci-build ci-lint ci-tests cleanup

.PHONY: run-prod
run-prod:
	docker build -t $(DOCKER_PROD_TAG) -f $(DOCKER_PROD_FILE) .
	docker run --rm -it -p 80:80 $(DOCKER_PROD_TAG)
