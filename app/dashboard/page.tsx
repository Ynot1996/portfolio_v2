import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiLogOut } from "react-icons/fi";
import { getOwnerMetrics } from "../lib/metrics";
import OwnerMetrics from "../components/OwnerMetrics";

export const metadata: Metadata = {
  title: "Owner dashboard",
  robots: { index: false, follow: false },
};

// Never statically prerender private data — render per request (behind the
// middleware gate). The underlying GitHub fetches are still cached hourly.
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const data = await getOwnerMetrics();
  const updated = new Date(data.generatedAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden /> Back to site
        </Link>
        <a
          href="/api/dash-login"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          Sign out <FiLogOut className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>

      <header className="mt-8 max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Owner dashboard · private
        </span>
        <h1 className="mt-2 font-serif text-4xl font-light tracking-tight">
          Every project, every metric
        </h1>
        <p className="mt-3 text-sm text-muted">
          Full GitHub reach across all repos — including private ones — refreshed hourly.
          Updated {updated}.
        </p>
      </header>

      <div className="mt-10">
        <OwnerMetrics data={data} />
      </div>
    </main>
  );
}
