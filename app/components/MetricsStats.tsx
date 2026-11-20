"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FiEye,
  FiUsers,
  FiStar,
  FiGitBranch,
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { MetricsSummary } from "../lib/metrics";

/* count-up, matching the hero stat chips */
function useCountUp(target: number, active: boolean, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function BandStat({
  label,
  value,
  sub,
  Icon,
  active,
}: {
  label: string;
  value: number;
  sub?: string;
  Icon: IconType;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
      <div className="flex items-center gap-2 text-muted">
        <Icon className="h-4 w-4 text-accent" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{label}</span>
      </div>
      <div className="mt-3 font-mono text-3xl font-semibold tabular-nums text-ink sm:text-4xl">
        {n.toLocaleString()}
      </div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}

function fmt(n: number | null) {
  return n === null ? "—" : n.toLocaleString();
}

export default function MetricsStats({ data }: { data: MetricsSummary }) {
  const ref = useRef<HTMLDivElement>(null);
  const realInView = useInView(ref, { once: true, margin: "-60px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = realInView || mounted;

  const { totals, perProject, hasTraffic, tokenConfigured } = data;

  return (
    <div ref={ref}>
      {/* aggregate band */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {hasTraffic && (
          <>
            <BandStat label="Repo views" value={totals.views} sub="last 14 days" Icon={FiEye} active={active} />
            <BandStat label="Unique visitors" value={totals.visitors} sub="last 14 days" Icon={FiUsers} active={active} />
          </>
        )}
        <BandStat label="GitHub stars" value={totals.stars} Icon={FiStar} active={active} />
        {hasTraffic ? (
          <BandStat label="Repos tracked" value={totals.repos} Icon={FiGithub} active={active} />
        ) : (
          <>
            <BandStat label="Forks" value={totals.forks} Icon={FiGitBranch} active={active} />
            <BandStat label="Repos tracked" value={totals.repos} Icon={FiGithub} active={active} />
          </>
        )}
      </div>

      {!tokenConfigured && (
        <p className="mt-3 font-mono text-[11px] text-muted">
          Traffic (views &amp; visitors) appears once a{" "}
          <span className="text-accent">GITHUB_TOKEN</span> env var is set. Stars and forks are live.
        </p>
      )}

      {/* per-project breakdown */}
      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
        {/* header row (desktop) */}
        <li className="hidden grid-cols-[1.4fr_repeat(3,0.7fr)_auto] items-center gap-4 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:grid">
          <span>Project</span>
          <span className="text-right">Views 14d</span>
          <span className="text-right">Visitors</span>
          <span className="text-right">Stars</span>
          <span className="text-right">Links</span>
        </li>

        {perProject.map((p) => (
          <li
            key={p.slug}
            className="grid grid-cols-2 items-center gap-3 px-5 py-4 sm:grid-cols-[1.4fr_repeat(3,0.7fr)_auto] sm:gap-4"
          >
            <Link
              href={`/projects/${p.slug}`}
              className="group col-span-2 inline-flex items-center gap-1.5 font-display text-sm font-semibold tracking-tight text-ink outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-accent sm:col-span-1"
            >
              {p.title}
              <FiArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </Link>

            <Metric label="Views" value={fmt(p.views)} Icon={FiEye} />
            <Metric label="Visitors" value={fmt(p.visitors)} Icon={FiUsers} />
            <Metric label="Stars" value={fmt(p.stars)} Icon={FiStar} />

            <div className="col-span-2 mt-1 flex items-center justify-start gap-3 sm:col-span-1 sm:mt-0 sm:justify-end">
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} source on GitHub`}
                className="text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FiGithub className="h-4 w-4" aria-hidden />
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} live demo`}
                  className="text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <FiExternalLink className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Metric({ label, value, Icon }: { label: string; value: string; Icon: IconType }) {
  return (
    <div className="flex items-center gap-1.5 sm:justify-end">
      <Icon className="h-3.5 w-3.5 text-muted sm:hidden" aria-hidden />
      <span className="font-mono text-[10px] uppercase tracking-wide text-muted sm:hidden">
        {label}
      </span>
      <span className="font-mono text-sm tabular-nums text-ink">{value}</span>
    </div>
  );
}
