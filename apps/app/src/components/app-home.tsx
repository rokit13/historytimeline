"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faRightFromBracket,
  faServer,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { env } from "@/lib/env";

export function AppHome() {
  const { logout, status, user } = useAuth();

  const authenticated = status === "authenticated" && user;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.14),_transparent_28%),linear-gradient(180deg,_rgba(7,12,23,1)_0%,_rgba(12,16,28,1)_100%)] px-6 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-box border border-white/10 bg-white/6 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
              App Frontend
            </p>
            <h1 className="text-2xl font-semibold">{env.appName}</h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {authenticated ? (
              <button type="button" className="btn btn-outline btn-sm gap-2" onClick={() => void logout()}>
                <FontAwesomeIcon icon={faRightFromBracket} className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link href="/login" className="btn btn-primary btn-sm gap-2">
                Login
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            )}
          </div>
        </header>

        <section className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.85fr]">
          <article className="rounded-box border border-white/10 bg-white/6 p-8 shadow-2xl shadow-black/20 backdrop-blur">
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-accent">
              Starter Home
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Centralized API access and JWT session state are ready for real
              features.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-base-300">
              This home screen stays generic on purpose. It verifies that the
              app layout, theme system, and auth scaffolding are in place
              without adding speculative product flows.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-box border border-white/10 bg-base-100/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <FontAwesomeIcon icon={faServer} className="h-4 w-4" />
                </div>
                <h3 className="font-semibold">API Base URL</h3>
                <p className="mt-2 font-mono text-sm text-base-300">{env.apiBaseUrl}</p>
              </div>

              <div className="rounded-box border border-white/10 bg-base-100/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-success">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
                </div>
                <h3 className="font-semibold">Session State</h3>
                <p className="mt-2 text-sm text-base-300">{status}</p>
              </div>
            </div>
          </article>

          <aside className="rounded-box border border-white/10 bg-base-100/80 p-6 shadow-xl shadow-black/15">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-secondary/15 text-secondary">
              <FontAwesomeIcon icon={faUserShield} className="h-4 w-4" />
            </div>
            <h3 className="text-2xl font-semibold">Auth Status</h3>

            {authenticated ? (
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.25em] text-base-400">
                    Name
                  </dt>
                  <dd className="mt-1 text-lg">{user.name}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.25em] text-base-400">
                    Email
                  </dt>
                  <dd className="mt-1 text-lg">{user.email}</dd>
                </div>
              </dl>
            ) : (
              <div className="mt-6 space-y-4">
                <p className="leading-7 text-base-300">
                  No authenticated user is loaded. Use the login route to test
                  the JWT flow against the Laravel API.
                </p>
                <Link href="/login" className="btn btn-primary w-full gap-2">
                  Go to Login
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
