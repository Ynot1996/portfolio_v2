"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiBookOpen,
  FiCpu,
  FiAward,
  FiZap,
  FiArrowUpRight,
  FiTrendingUp,
  FiLayers,
  FiFlag,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { timeline, type Milestone, type MilestoneKind, type Phase } from "../data";
import Footer from "./Footer";

const kindIcon: Record<MilestoneKind, IconType> = {
  work: FiBriefcase,
  education: FiBookOpen,
  project: FiCpu,
  award: FiAward,
  milestone: FiZap,
};

const phaseOrder: Phase[] = ["Finance & economics", "Foundation", "United Kingdom"];
const phaseMeta: Record<Phase, { label: string; Icon: IconType; text: string; varName: string }> = {
  "Finance & economics": { label: "Finance & economics", Icon: FiTrendingUp, text: "text-muted", varName: "--muted" },
  Foundation: { label: "Foundation & prep", Icon: FiLayers, text: "text-accent", varName: "--accent" },
  "United Kingdom": { label: "United Kingdom", Icon: FiFlag, text: "text-accent2", varName: "--accent-2" },
};

const groups = phaseOrder.map((ph) => ({
  phase: ph,
  items: timeline.filter((m) => m.phase === ph),
}));

/* ------------------------------ Node card -------------------------------- */
function Card({ m, delay = 0 }: { m: Milestone; delay?: number }) {
  const Icon = kindIcon[m.kind];
  const meta = phaseMeta[m.phase];
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-line bg-panel p-4 shadow-soft transition-colors hover:border-accent/40"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted">{m.period}</span>
        <Icon className={`h-4 w-4 ${meta.text}`} aria-hidden />
      </div>
      <h3 className="mt-2 font-display text-sm font-semibold leading-snug tracking-tight text-ink">
        {m.title}
      </h3>
      <p className="mt-0.5 text-xs text-muted">{m.org}</p>
      {m.slug && (
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
          Case study <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      )}
    </motion.div>
  );
  return m.slug ? (
    <Link
      href={`/projects/${m.slug}`}
      className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {inner}
    </Link>
  ) : (
    inner
  );
}

/* --------------------------- Desktop serpentine -------------------------- */
const START = 110;
const COLGAP = 205;
const Y0 = 52;
const ROWGAP = 244;
const BULGE = 78;
const CARD_W = 196;

function DesktopRail() {
  // assign each milestone a (col,row) in a boustrophedon grid
  let endCol = 0;
  const placed: { m: Milestone; col: number; row: number }[] = [];
  const rowMeta: { y: number; startCol: number; endCol: number; ltr: boolean }[] = [];

  groups.forEach((g, row) => {
    const ltr = row % 2 === 0;
    const startCol = row === 0 ? 0 : endCol;
    g.items.forEach((m, idx) => {
      const col = ltr ? startCol + idx : startCol - idx;
      placed.push({ m, col, row });
    });
    endCol = ltr ? startCol + g.items.length - 1 : startCol - (g.items.length - 1);
    rowMeta.push({ y: Y0 + row * ROWGAP, startCol, endCol, ltr });
  });

  const xAt = (col: number) => START + col * COLGAP;
  const maxCol = Math.max(...placed.map((p) => p.col));
  const width = START * 2 + maxCol * COLGAP;
  const height = Y0 + (groups.length - 1) * ROWGAP + 200;

  // build the snaking path with rounded U-turns
  let d = `M ${xAt(rowMeta[0].startCol)} ${rowMeta[0].y} L ${xAt(rowMeta[0].endCol)} ${rowMeta[0].y}`;
  for (let r = 1; r < rowMeta.length; r++) {
    const prev = rowMeta[r - 1];
    const cur = rowMeta[r];
    const turnX = xAt(prev.endCol); // equals xAt(cur.startCol)
    const b = prev.ltr ? BULGE : -BULGE;
    d += ` C ${turnX + b} ${prev.y}, ${turnX + b} ${cur.y}, ${turnX} ${cur.y}`;
    d += ` L ${xAt(cur.endCol)} ${cur.y}`;
  }

  return (
    <div className="no-scrollbar hidden overflow-x-auto px-5 pb-4 sm:px-8 lg:block">
      <div className="relative mx-auto" style={{ width, height }}>
        <svg width={width} height={height} className="absolute inset-0" fill="none" aria-hidden>
          <defs>
            <linearGradient id="journeyLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "rgb(var(--muted))" }} />
              <stop offset="50%" style={{ stopColor: "rgb(var(--accent))" }} />
              <stop offset="100%" style={{ stopColor: "rgb(var(--accent-2))" }} />
            </linearGradient>
          </defs>
          <path d={d} stroke="url(#journeyLine)" strokeWidth={2.5} strokeLinecap="round" />
          {placed.map(({ m, col, row }) => (
            <circle
              key={m.title}
              cx={xAt(col)}
              cy={rowMeta[row].y}
              r={7}
              style={{ fill: `rgb(var(${phaseMeta[m.phase].varName}))` }}
              stroke="rgb(var(--panel-2))"
              strokeWidth={5}
            />
          ))}
        </svg>

        {/* phase labels at each row's start */}
        {rowMeta.map((rm, r) => {
          const meta = phaseMeta[groups[r].phase];
          return (
            <div
              key={groups[r].phase}
              className="absolute -translate-y-full"
              style={{
                left: xAt(rm.startCol),
                top: rm.y - 18,
                transform: `translate(${rm.ltr ? "0" : "-100%"}, -100%)`,
              }}
            >
              <span className={`inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] ${meta.text}`}>
                <meta.Icon className="h-3.5 w-3.5" aria-hidden />
                {meta.label}
              </span>
            </div>
          );
        })}

        {/* cards hanging below each node */}
        {placed.map(({ m, col, row }, i) => (
          <div
            key={m.title}
            className="absolute"
            style={{
              left: xAt(col),
              top: rowMeta[row].y + 26,
              width: CARD_W,
              transform: "translateX(-50%)",
            }}
          >
            <Card m={m} delay={(i % 5) * 0.04} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Mobile vertical ---------------------------- */
function MobileRail() {
  return (
    <div className="mx-auto w-full max-w-content px-5 sm:px-8 lg:hidden">
      {groups.map((g) => {
        const meta = phaseMeta[g.phase];
        return (
          <div key={g.phase} className="mt-8 first:mt-6">
            <span className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] ${meta.text}`}>
              <meta.Icon className="h-3.5 w-3.5" aria-hidden />
              {meta.label}
            </span>
            <ol className="relative mt-3 space-y-3 border-l-2 border-line pl-5">
              {g.items.map((m) => (
                <li key={m.title} className="relative">
                  <span
                    className="absolute -left-[26px] top-3 h-3 w-3 rounded-full ring-4 ring-panel2"
                    style={{ background: `rgb(var(${meta.varName}))` }}
                  />
                  <Card m={m} />
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="journey" className="border-t border-line bg-panel2/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            03 — Journey
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-5xl">
            From economics to engineering
          </h2>
          <p className="mt-4 text-muted">
            Three chapters — a finance &amp; economics career, a foundation-building
            pivot, then the climb in the UK. Follow the path.
          </p>
        </header>
      </div>

      <div className="mt-12">
        <DesktopRail />
        <MobileRail />
      </div>

      <Footer />
    </section>
  );
}
