"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiBookOpen,
  FiCpu,
  FiAward,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { timeline, type MilestoneKind } from "../data";
import Footer from "./Footer";

const kindIcon: Record<MilestoneKind, IconType> = {
  work: FiBriefcase,
  education: FiBookOpen,
  project: FiCpu,
  award: FiAward,
  milestone: FiZap,
};

const kindLabel: Record<MilestoneKind, string> = {
  work: "Work",
  education: "Education",
  project: "Project",
  award: "Award",
  milestone: "Milestone",
};

const kindColor: Record<MilestoneKind, string> = {
  work: "text-muted",
  education: "text-accent",
  project: "text-accent2",
  award: "text-up",
  milestone: "text-up",
};
const kindDot: Record<MilestoneKind, string> = {
  work: "bg-muted",
  education: "bg-accent",
  project: "bg-accent2",
  award: "bg-up",
  milestone: "bg-up",
};

export default function Timeline() {
  return (
    <section
      id="journey"
      className="snap-section flex min-h-screen flex-col border-t border-line bg-panel2/40 pt-24"
    >
      <div className="flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            03 — Journey
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-5xl">
            From economics to engineering
          </h2>
          <p className="mt-4 text-muted">
            A deliberate pivot from a finance &amp; economics career into software —
            scroll the rail to follow the learning and projects that got me here.
          </p>
        </header>
      </div>

      {/* horizontal rail */}
      <div className="no-scrollbar mt-12 overflow-x-auto pb-4">
        <div className="mx-auto flex min-w-max items-stretch gap-5 px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-72rem)/2))]">
          {timeline.map((m, i) => {
            const Icon = kindIcon[m.kind];
            const newPhase = i === 0 || timeline[i - 1].phase !== m.phase;

            const card = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="relative flex h-full w-[260px] flex-col rounded-2xl border border-line bg-panel p-5 transition-colors group-hover:border-accent/40"
              >
                {/* connector node */}
                <span
                  className={`absolute -top-[34px] left-6 h-3 w-3 rounded-full ring-4 ring-bg ${kindDot[m.kind]}`}
                />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">{m.period}</span>
                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide ${kindColor[m.kind]}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {kindLabel[m.kind]}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-ink">
                  {m.title}
                </h3>
                <p className="text-sm text-muted">{m.org}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                  {m.description}
                </p>

                {m.slug && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Case study <FiArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                )}
              </motion.div>
            );

            const cardCol = (
              <div key={m.title} className="group relative pt-9">
                {/* spine segment */}
                <span aria-hidden className="absolute left-0 right-0 top-[28px] h-px bg-line" />
                {m.slug ? (
                  <Link
                    href={`/projects/${m.slug}`}
                    className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </div>
            );

            // phase divider label, shown at the start of each phase group
            const phaseMarker = newPhase ? (
              <div
                key={`phase-${m.phase}`}
                className="flex shrink-0 items-center self-stretch pt-9"
                aria-hidden
              >
                <span className="ml-1 mr-1 inline-block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-accent [writing-mode:vertical-rl] rotate-180">
                  {m.phase}
                </span>
                <span className="h-full w-px bg-gradient-to-b from-transparent via-line to-transparent" />
              </div>
            ) : null;

            return (
              <Fragment key={m.title}>
                {phaseMarker}
                {cardCol}
              </Fragment>
            );
          })}
        </div>
      </div>
      </div>
      <Footer />
    </section>
  );
}
