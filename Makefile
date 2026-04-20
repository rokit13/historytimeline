SHELL := /bin/zsh
COMMIT_MSG ?= Update

.PHONY: install api-install marketing-install app-install playwright-install api-dev marketing-dev app-dev dev api-clear api-test lint build test e2e commit

install: api-install marketing-install app-install playwright-install

api-install:
	cd apps/api && composer install

marketing-install:
	cd apps/marketing && npm install

app-install:
	cd apps/app && npm install

playwright-install:
	npm install

api-dev:
	cd apps/api && php artisan serve --host=127.0.0.1 --port=8000

marketing-dev:
	cd apps/marketing && npm run dev

app-dev:
	cd apps/app && npm run dev

dev:
	$(MAKE) -j 3 api-dev marketing-dev app-dev

api-clear:
	cd apps/api && php artisan optimize:clear

api-test:
	cd apps/api && php artisan test

lint:
	cd apps/marketing && npm run lint
	cd apps/app && npm run lint

build:
	cd apps/marketing && npm run build
	cd apps/app && npm run build

e2e:
	npm run test:e2e

test: api-test

commit:
	git add .
	@if git diff --cached --quiet; then \
		echo "No changes to commit."; \
	else \
		git commit -m "$(COMMIT_MSG)"; \
	fi
	@branch=$$(git branch --show-current); \
	if [ -z "$$branch" ]; then \
		echo "Unable to determine the current git branch."; \
		exit 1; \
	fi; \
	git push -u origin "$$branch"
