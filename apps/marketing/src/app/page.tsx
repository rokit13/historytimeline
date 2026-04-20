import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faCodeBranch,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { env } from "@/lib/env";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_32%),linear-gradient(180deg,_rgba(8,13,24,1)_0%,_rgba(14,18,32,1)_100%)] text-base-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between rounded-box border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
              Launch Foundation
            </p>
            <h1 className="text-lg font-semibold">{env.appName}</h1>
          </div>
          <ThemeToggle />
        </header>

        <section className="grid flex-1 gap-10 py-16 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-sm uppercase tracking-[0.35em] text-accent">
                Marketing Site
              </p>
              <h2 className="max-w-3xl text-5xl font-semibold leading-tight md:text-6xl">
                A clean monorepo starting point for the public site, app shell,
                and API.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-base-300">
                This page is intentionally minimal. It establishes the platform
                frame, theme system, and navigation without inventing product
                features.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={env.appUrl} className="btn btn-primary btn-lg gap-3">
                Open App
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
              <a
                href={env.apiBaseUrl.replace(/\/api$/, "/api/health")}
                className="btn btn-ghost btn-lg border border-white/10"
                target="_blank"
                rel="noreferrer"
              >
                API Health
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: faShieldHalved,
                title: "JWT-ready API access",
                body: "Backend auth is wired for token-based session flows without session-coupled UI logic.",
              },
              {
                icon: faCodeBranch,
                title: "Separate surfaces",
                body: "Marketing and app frontends are isolated so each can evolve without layout drift.",
              },
              {
                icon: faBolt,
                title: "Deployment-minded baseline",
                body: "The repo includes starter docs, local commands, and a manual Ubuntu deployment path.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-box border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-base-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
