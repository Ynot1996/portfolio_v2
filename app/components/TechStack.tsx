"use client";

import { motion } from "framer-motion";
import { techGroups, type Tech } from "../data";

function TechItem({ tech }: { tech: Tech }) {
  const { icon: Icon, name, color } = tech;
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      className="group flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-panel transition-colors"
        style={{ ["--c" as string]: color }}
      >
        <Icon
          className="h-5 w-5 text-muted transition-colors group-hover:text-[color:var(--c)]"
          aria-hidden
        />
      </span>
      <span className="text-sm font-medium text-ink">{name}</span>
    </motion.li>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="border-t border-line bg-panel/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            01 — Toolkit
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tools for craft, product and polish
          </h2>
          <p className="mt-3 text-muted">
            The technical palette I use to shape experiences, iterate quickly and keep interfaces sharp.
          </p>
        </header>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {techGroups.map((group) => (
            <motion.div
              key={group.category}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
                <span className="h-px w-6 bg-line" />
                {group.category}
              </h3>
              <ul className="grid gap-2.5">
                {group.items.map((t) => (
                  <TechItem key={t.name} tech={t} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
