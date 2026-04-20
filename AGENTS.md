# Agent Guidelines

- Reuse existing code before creating new code.
- Do not duplicate components, services, hooks, helpers, API clients, or auth logic.
- Search the codebase before introducing a new pattern.
- Extend existing patterns instead of creating parallel ones.
- Keep files small, focused, and single-purpose.
- Keep business logic out of presentational components.
- Centralize API access instead of scattering `fetch` calls across pages.
- Follow Laravel conventions for routes, controllers, requests, resources, config, middleware, and environment usage.
- Follow Next.js App Router conventions and choose server or client components intentionally.
- Avoid speculative architecture, fake features, and unnecessary abstraction.
