# HistoryTimeline Monorepo

Starter monorepo foundation for a Laravel 12 API, a Next.js 16 marketing frontend, and a Next.js 16 app frontend.

## Stack

- Laravel 12 API on PHP 8.3
- MySQL
- JWT auth with `tymon/jwt-auth`
- Next.js 16 + React + App Router
- Tailwind CSS + daisyUI
- Font Awesome Free
- Flatpickr
- Playwright
- Manual deployment workflow for DigitalOcean Ubuntu

## Structure

```txt
.
├── apps
│   ├── api
│   ├── app
│   └── marketing
├── docs
├── scripts
├── tests
├── .github
├── AGENTS.md
├── Makefile
├── README.md
└── playwright.config.ts
```

## Local setup

1. Copy environment files:
   - `cp apps/api/.env.example apps/api/.env`
   - `cp apps/marketing/.env.example apps/marketing/.env.local`
   - `cp apps/app/.env.example apps/app/.env.local`
2. Update the API env for your MySQL connection and service credentials.
3. Install dependencies:
   - `make install`
4. Generate an API key and JWT secret if you created a fresh API env manually:
   - `cd apps/api && php artisan key:generate`
   - `cd apps/api && php artisan jwt:secret`
5. Run API migrations against MySQL:
   - `cd apps/api && php artisan migrate`

## Running locally

- API: `make api-dev`
- Marketing frontend: `make marketing-dev`
- App frontend: `make app-dev`
- Run all three: `make dev`

Default local URLs:

- API: `http://localhost:8000`
- Marketing: `http://localhost:3000`
- App: `http://localhost:3001`

## Environment notes

- `apps/api/.env.example` includes placeholders for MySQL, JWT, Mailgun, Twilio, OpenAI, and allowed frontend origins.
- `apps/marketing/.env.example` points the public site at the app URL and API base URL.
- `apps/app/.env.example` points the app at the Laravel API base URL.
- Do not commit real secrets.

## Testing

- API tests: `make api-test`
- Frontend lint: `make lint`
- Playwright smoke tests: `npm run test:e2e`

Playwright will start the marketing and app frontends automatically. Install browsers with `npx playwright install` when needed.

## Deployment

Deployment is intentionally manual and Ubuntu-friendly.

1. Push the branch to GitHub.
2. Pull it onto the DigitalOcean droplet.
3. Run `scripts/deploy-api.sh`.
4. Run `scripts/deploy-next.sh marketing`.
5. Run `scripts/deploy-next.sh app`.
6. Restart or reload your process manager and reverse proxy if needed.

See `docs/digitalocean-ubuntu.md` for the full flow and the optional `workflow_dispatch` GitHub deployment workflow.
