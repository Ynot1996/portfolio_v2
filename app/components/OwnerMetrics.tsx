"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiEye,
  FiUsers,
  FiDownloadCloud,
  FiStar,
  FiGitBranch,
  FiEye as FiWatch,
  FiAlertCircle,
  FiGithub,
  FiExternalLink,
  FiLock,
  FiActivity,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { MetricsSummary, RepoMetric } from "../lib/metrics";

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function relTime(iso: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d <= 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 30) return `${d}d ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

const fmt = (n: number | null) => (n === null ? "—" : n.toLocaleString());

function BandStat({ label, value, sub, Icon }: { label: string; value: number; sub?: string; Icon: IconType }) {
  const n = useCountUp(value);
  return (
    <div className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
      <div className="flex items-center gap-2 text-muted">
        <Icon className="h-4 w-4 text-accent" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{label}</span>
      </div>
      <div className="mt-3 font-mono text-3xl font-semibold tabular-nums text-ink">
        {n.toLocaleString()}
      </div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}

function Cell({ label, value, Icon }: { label: string; value: string; Icon: IconType }) {
  return (
    <div className="rounded-lg bg-panel2 px-3 py-2">
      <div className="flex items-center gap-1 text-muted">
        <Icon className="h-3 w-3" aria-hidden />
        <span className="font-mono text-[9px] uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-0.5 font-mono text-sm tabular-nums text-ink">{value}</div>
    </div>
  );
}

function RepoCard({ r }: { r: RepoMetric }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/projects/${r.slug}`}
            className="font-display text-base font-semibold tracking-tight text-ink hover:text-accent"
          >
            {r.title}
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted">
            <span className={r.isPrivate ? "inline-flex items-center gap-1 text-accent2" : "inline-flex items-center gap-1"}>
              {r.isPrivate ? <FiLock className="h-3 w-3" aria-hidden /> : <FiGithub className="h-3 w-3" aria-hidden />}
              {r.isPrivate ? "Private" : "Public"}
            </span>
            {r.language && <span>· {r.language}</span>}
            <span>· pushed {relTime(r.pushedAt)}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href={r.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Repo" className="text-muted hover:text-ink">
            <FiGithub className="h-4 w-4" aria-hidden />
          </a>
          {r.live && (
            <a href={r.live} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-muted hover:text-ink">
              <FiExternalLink className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        <Cell label="Views 14d" value={fmt(r.views)} Icon={FiEye} />
        <Cell label="Visitors" value={fmt(r.visitors)} Icon={FiUsers} />
        <Cell label="Clones" value={fmt(r.clones)} Icon={FiDownloadCloud} />
        <Cell label="Stars" value={fmt(r.stars)} Icon={FiStar} />
        <Cell label="Forks" value={fmt(r.forks)} Icon={FiGitBranch} />
        <Cell label="Watchers" value={fmt(r.watchers)} Icon={FiWatch} />
        <Cell label="Issues" value={fmt(r.openIssues)} Icon={FiAlertCircle} />
        <Cell label="Clone users" value={fmt(r.cloneVisitors)} Icon={FiUsers} />
      </div>

      {r.topReferrers.length > 0 && (
        <div className="mt-4">
          <div className="font-mono text-[9px] uppercase tracking-wide text-muted">Top referrers</div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {r.topReferrers.map((ref) => (
              <span key={ref.referrer} className="rounded-full bg-panel2 px-2.5 py-1 font-mono text-[10px] text-muted">
                {ref.referrer} <span className="text-ink">{ref.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OwnerMetrics({ data }: { data: MetricsSummary }) {
  const { totals, perProject, tokenConfigured } = data;

  return (
    <div>
      {/* aggregate band */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <BandStat label="Repo views" value={totals.views} sub="14 days · all repos" Icon={FiEye} />
        <BandStat label="Unique visitors" value={totals.visitors} sub="14 days" Icon={FiUsers} />
        <BandStat label="Clones" value={totals.clones} sub="14 days" Icon={FiDownloadCloud} />
        <BandStat label="Stars" value={totals.stars} Icon={FiStar} />
        <BandStat label="Watchers" value={totals.watchers} Icon={FiWatch} />
      </div>

      {!tokenConfigured && (
        <p className="mt-3 font-mono text-[11px] text-muted">
          Traffic is blank until a <span className="text-accent">GITHUB_TOKEN</span> (classic PAT,
          <span className="font-mono"> repo</span> scope) is set. Stars / forks / watchers are live.
        </p>
      )}

      {/* per-project detail */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {perProject.map((r) => (
          <RepoCard key={r.slug} r={r} />
        ))}
      </div>

      {/* live-app analytics — the honest gap */}
      <div className="mt-8 rounded-2xl border border-dashed border-line bg-panel/60 p-5">
        <div className="flex items-center gap-2 text-accent2">
          <FiActivity className="h-4 w-4" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
            Live-app visitor analytics
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          The numbers above are <strong className="text-ink">GitHub repo</strong> reach — how
          people engage with the code. To measure the <strong className="text-ink">deployed
          apps</strong> themselves (real sessions, pageviews, countries, referrers across
          Vercel / Azure / Render / GitHub Pages), add one privacy-analytics snippet
          (Umami or Plausible, free tier) to each live site. Once connected, those numbers
          slot in here — the owner-only view, kept out of the public section.
        </p>
      </div>
    </div>
  );
}
