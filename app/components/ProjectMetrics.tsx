import { getProjectMetrics } from "../lib/metrics";
import MetricsStats from "./MetricsStats";

// Server component: fetches live GitHub metrics (ISR-cached, token stays
// server-side) and hands them to the animated client display.
export default async function ProjectMetrics() {
  const data = await getProjectMetrics();

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
      </div>
    </section>
  );
}
