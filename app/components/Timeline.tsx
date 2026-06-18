"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBriefcase, FiBookOpen, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";
import { timeline, type Milestone } from "../data";

const kindIcon: Record<Milestone["kind"], IconType> = {
  work: FiBriefcase,
  education: FiBookOpen,
  milestone: FiZap,
};

const kindLabel: Record<Milestone["kind"], string> = {
  work: "Work",
  education: "Education",
  milestone: "Milestone",
};

export default function Timeline() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="journey"
      className="border-t border-line bg-panel/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            03 — Journey
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Career timeline
          </h2>
          <p className="mt-3 text-muted">
            A personal path from economics into software, AI and product-focused engineering.
          </p>
        </header>

        <div className="mt-10 rounded-3xl border border-line bg-white p-6 shadow-soft">
          <p className="text-sm leading-relaxed text-muted">
            Highlighting the experience, product thinking and collaborative roles that shape the work shown above.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              AI & product
            </span>
            <span className="rounded-full bg-panel px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Banking & audit
            </span>
            <span className="rounded-full bg-panel px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Data storytelling
            </span>
          </div>
        </div>

        <ol className="relative mt-12">
          {/* spine */}
          <span
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-px bg-line"
          />

          {timeline.map((m, i) => {
            const Icon = kindIcon[m.kind];
            const isOpen = open === i;
            return (
              <li key={m.title} className="relative pl-12 pb-6 last:pb-0">
                {/* node */}
                <button
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span
                    className={[
                      "absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border transition-colors",
                      isOpen
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-white text-muted group-hover:border-accent/40 group-hover:text-ink",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>

                  <div className="flex-1 rounded-2xl border border-line bg-white px-4 py-3 transition-colors group-hover:border-accent/30">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-base font-semibold tracking-tight">
                            {m.title}
                          </h3>
                          <span className="rounded-md bg-panel px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                            {kindLabel[m.kind]}
                          </span>
                        </div>
                        <p className="text-sm text-muted">{m.org}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-muted">
                        {m.period}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden text-sm leading-relaxed text-ink/80"
                        >
                          <span className="mt-3 block">{m.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
