import type { Metadata } from "next";
import { FiLock } from "react-icons/fi";

export const metadata: Metadata = { title: "Owner sign-in", robots: { index: false } };

export default function DashboardLogin({
  searchParams,
}: {
  searchParams: { e?: string };
}) {
  const notConfigured = searchParams.e === "noconf";
  const wrong = searchParams.e === "1";

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2 text-accent">
          <FiLock className="h-4 w-4" aria-hidden />
          <span className="font-mono text-xs uppercase tracking-[0.2em]">Owner dashboard</span>
        </div>
        <h1 className="font-serif text-3xl font-light tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Private project metrics. Visitors see the public reach section on the homepage.
        </p>

        {notConfigured ? (
          <div className="mt-6 rounded-xl border border-line bg-panel p-4 text-sm text-muted">
            This dashboard isn&apos;t configured yet. Set a{" "}
            <span className="font-mono text-accent">DASHBOARD_PASSWORD</span> environment
            variable (locally in <span className="font-mono">.env.local</span>, or in Vercel),
            then reload.
          </div>
        ) : (
          <form action="/api/dash-login" method="post" className="mt-6">
            <label htmlFor="password" className="font-mono text-[11px] uppercase tracking-wide text-muted">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="mt-1.5 w-full rounded-xl border border-line bg-panel px-4 py-3 text-ink outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent"
            />
            {wrong && (
              <p className="mt-2 text-xs text-down">Incorrect password — try again.</p>
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-bg outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
            >
              Enter dashboard
            </button>
          </form>
        )}

        <a
          href="/"
          className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          ← Back to site
        </a>
      </div>
    </main>
  );
}
