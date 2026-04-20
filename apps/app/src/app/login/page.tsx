import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.18),_transparent_30%),linear-gradient(180deg,_rgba(5,10,20,1)_0%,_rgba(12,16,28,1)_100%)] px-6 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="space-y-6 rounded-box border border-white/10 bg-white/6 p-8 shadow-2xl shadow-black/25 backdrop-blur">
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-primary">
            JWT Login
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Sign in against the Laravel API foundation.
          </h1>
          <p className="max-w-xl text-base leading-8 text-base-300">
            This starter page exercises the centralized API client and auth
            provider without introducing any product-specific flows.
          </p>
        </section>

        <LoginForm />
      </div>
    </main>
  );
}
