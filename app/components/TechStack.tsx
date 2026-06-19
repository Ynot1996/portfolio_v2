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
      className="group flex items-center gap-3 rounded-xl border border-line bg-panel px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-panel2 transition-colors"
        style={color ? ({ ["--c" as string]: color } as React.CSSProperties) : undefined}
      >
        {Icon ? (
          <Icon
            className="h-5 w-5 text-muted transition-colors group-hover:text-[color:var(--c)]"
            aria-hidden
          />
        ) : (
          <span className="font-mono text-xs font-semibold text-muted group-hover:text-accent">
            {name.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="text-sm font-medium text-ink">{name}</span>
    </motion.li>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="border-t border-line bg-panel2/40 py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            01 — Toolkit
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-5xl">
            The stack I build with
          </h2>
          <p className="mt-4 text-muted">
            Python-first across full-stack, AI/ML and fintech — with C# / .NET, cloud
            tooling and a habit of designing systems before writing code.
          </p>
        </header>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((group) => (
            <motion.div
              key={group.category}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
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
