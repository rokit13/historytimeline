# DigitalOcean Ubuntu Deployment

This repo is set up for a manual deployment flow to an Ubuntu droplet where MySQL is managed separately.

## Recommended server shape

- Ubuntu 24.04 LTS
- PHP 8.3 with required Laravel extensions
- Composer 2
- Node.js 22+
- Nginx or Caddy in front of PHP-FPM and the Next.js processes
- Separate MySQL instance or managed database
- `systemd` services for the API, marketing frontend, and app frontend

## Initial server setup

1. Clone the repository onto the droplet.
2. Create environment files for `apps/api`, `apps/marketing`, and `apps/app`.
3. Point the API env at the production MySQL instance.
4. Configure web server virtual hosts or reverse proxies:
   - API to PHP-FPM / Laravel public entrypoint
   - Marketing to the Next.js marketing service
   - App to the Next.js app service

## Manual deployment steps

1. Pull the branch you want to deploy on the droplet.
2. Run `scripts/deploy-api.sh` for the Laravel API.
3. Run `scripts/deploy-next.sh marketing`.
4. Run `scripts/deploy-next.sh app`.
5. Restart or reload your `systemd` services if you did not provide service names to the scripts.

## GitHub manual deploy workflow

`.github/workflows/manual-deploy.yml` is wired for `workflow_dispatch` and expects these repository secrets:

- `DO_HOST`
- `DO_USER`
- `DO_SSH_KEY`
- `DO_DEPLOY_PATH`

Optional variables or secrets:

- `DO_API_SERVICE`
- `DO_MARKETING_SERVICE`
- `DO_APP_SERVICE`

Adjust the workflow and scripts to match your exact service names, deployment path, and reverse proxy setup.
