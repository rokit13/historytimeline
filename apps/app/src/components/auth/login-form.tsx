"use client";

import { startTransition, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ApiError } from "@/services/api-client";
import { useAuth } from "@/hooks/use-auth";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(form);
      startTransition(() => {
        router.push("/");
      });
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        setError(caughtError.payload?.message ?? "Unable to sign in.");
      } else {
        setError("Unable to sign in.");
      }

      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <section className="rounded-box border border-white/10 bg-base-100/85 p-8 shadow-2xl shadow-black/20">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-base-400">
          App Access
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Login</h2>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="form-control gap-2">
          <span className="label-text font-medium">Email</span>
          <input
            type="email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            required
          />
        </label>

        <label className="form-control gap-2">
          <span className="label-text font-medium">Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            required
          />
        </label>

        {error ? <p className="text-sm text-error">{error}</p> : null}

        <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-sm leading-7 text-base-400">
        This route only provides the authentication starter flow. Return to the{" "}
        <Link href="/" className="link link-hover text-primary">
          app home
        </Link>{" "}
        when a session is active.
      </p>
    </section>
  );
}
