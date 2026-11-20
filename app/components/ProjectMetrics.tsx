import Link from "next/link";
import { FiLock } from "react-icons/fi";
import { getPublicMetrics } from "../lib/metrics";
import MetricsStats from "./MetricsStats";

// Server component: fetches PUBLIC GitHub metrics (ISR-cached, token stays
// server-side, private repos excluded) and hands them to the animated display.
export default async function ProjectMetrics() {
  const data = await getPublicMetrics();

  return (
    <section id="metrics" className="border-t border-line bg-panel2/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            03 — Live metrics
          </span>
          <h2 className="mt-2 font-serif text-3xl font-light tracking-tight sm:text-4xl">
            Project reach, quantified
          </h2>
          <p className="mt-3 text-sm text-muted">
            Live GitHub stars and 14-day repository traffic across my projects,
            refreshed hourly — so impact is measurable, not just claimed.
          </p>
        </header>

        <div className="mt-8">
          <MetricsStats data={data} />
        </div>

        <div className="mt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FiLock className="h-3.5 w-3.5" aria-hidden />
            Owner dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
